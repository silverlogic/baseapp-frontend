import { useCallback, useEffect, useRef, useState } from 'react'

import { useIntl } from 'react-intl'
import { ConnectionHandler } from 'react-relay'
import { useShallow } from 'zustand/react/shallow'

import { FileUploadStatus } from '../../constants'
import { useFileUploadStore } from '../../context/FileUploadProvider'
import { useFileAttachToTargetMutation } from '../../graphql/mutations/FileAttachToTarget'
import type { FileUploadProgress } from '../../types'
import { uploadTokensFor } from '../../utils/uploadTokens'
import { useChunkedUpload } from '../useChunkedUpload'
import { ATTACH_ERROR_MESSAGES } from './constants'
import type { AttachOptions, UseFileUploadLogicParams, UseFileUploadLogicReturn } from './types'

/** Relay ids of the finished uploads in `scope`. */
const completedRelayIdsIn = (files: Iterable<FileUploadProgress>, scope: string) =>
  Array.from(files).flatMap((file) =>
    file.scope === scope && file.status === FileUploadStatus.COMPLETED && file.fileRelayId
      ? [file.fileRelayId]
      : [],
  )

/**
 * Hook that orchestrates the file upload and attach logic
 * This hook is platform-agnostic and can be used in both web and native
 */
export const useFileUploadLogic = ({
  targetObjectId,
  autoAttach = true,
  onUploadComplete,
  onAttachComplete,
  onError,
}: UseFileUploadLogicParams): UseFileUploadLogicReturn => {
  const intl = useIntl()
  const [attachFiles, isAttaching] = useFileAttachToTargetMutation()
  const [resetKey, setResetKey] = useState(0)

  // Relay ids already sent to the attach mutation, so a late completion that the
  // batch below already covered is not attached twice.
  const attachedRef = useRef<Set<string>>(new Set())
  // Batches in flight; while one is running it owns every file that completes.
  const batchesRef = useRef(0)
  // Relay ids whose attach failed. The effect below re-runs on unrelated renders,
  // so these wait for the user's next upload instead of being resent in a loop.
  const failedRef = useRef<Set<string>>(new Set())

  const attach = useCallback(
    (fileRelayIds: string[], { clearAfter }: AttachOptions) => {
      const fresh = fileRelayIds.filter((id) => !attachedRef.current.has(id))
      if (!fresh.length || !targetObjectId) return

      fresh.forEach((id) => attachedRef.current.add(id))
      const connectionID = ConnectionHandler.getConnectionID(targetObjectId, 'FilesList_files')

      const markFailed = (error: Error) => {
        fresh.forEach((id) => {
          attachedRef.current.delete(id)
          failedRef.current.add(id)
        })
        onError?.(error)
      }

      attachFiles({
        variables: {
          input: { fileRelayIds: fresh, targetObjectId, uploadTokens: uploadTokensFor(fresh) },
          connections: [connectionID],
        },
        onCompleted: (response, errors) => {
          // The mutation hook also calls onCompleted for a rejected attach (it only
          // toasts), and the payload may be null; without a payload confirming the
          // attach, keep those files listed and handle it like onError.
          const messages = [
            ...(errors ?? []).map((error) => error.message),
            ...(response?.fileAttachToTarget?.errors ?? []).flatMap(
              (error) => error?.messages ?? [],
            ),
          ]
          const payload = response?.fileAttachToTarget
          if (errors?.length || !payload || payload.errors?.length) {
            markFailed(
              new Error(
                messages.join(', ') || intl.formatMessage(ATTACH_ERROR_MESSAGES.attachFailed),
              ),
            )
            return
          }

          // Remove exactly the files that were just attached — Relay now serves
          // them from the target's connection. Clearing the whole scope here
          // would also discard uploads the user started in the meantime.
          const store = useFileUploadStore.getState()
          Array.from(store.files.values())
            .filter((file) => file.fileRelayId && fresh.includes(file.fileRelayId))
            .forEach((file) => store.removeFile(file.id))
          if (clearAfter) {
            setResetKey((prev) => prev + 1)
          }
          onAttachComplete?.()
        },
        onError: markFailed,
      })
    },
    [attachFiles, targetObjectId, onAttachComplete, onError, intl],
  )

  const { uploadFile } = useChunkedUpload()

  // Resume/retry finish outside the original batch, started from the list item's own
  // useChunkedUpload, so no callback here sees them. Pick them up from the store
  // instead; while a batch runs it handles its own files and this waits.
  const handleCompletedOutsideBatch = useCallback(() => {
    if (!targetObjectId || batchesRef.current > 0) return
    const store = useFileUploadStore.getState()
    const completed = completedRelayIdsIn(store.files.values(), targetObjectId)

    if (autoAttach) {
      attach(
        completed.filter((id) => !failedRef.current.has(id)),
        { clearAfter: false },
      )
      return
    }

    // The caller attaches these itself: report them with their upload tokens, then
    // drop them like the batch path does, so each is reported once.
    if (!completed.length) return
    onUploadComplete?.(completed, uploadTokensFor(completed))
    Array.from(store.files.values())
      .filter((file) => file.fileRelayId && completed.includes(file.fileRelayId))
      .forEach((file) => store.removeFile(file.id))
  }, [autoAttach, targetObjectId, attach, onUploadComplete])

  const completedRelayIds = useFileUploadStore(
    useShallow((state) =>
      targetObjectId ? completedRelayIdsIn(state.files.values(), targetObjectId) : [],
    ),
  )

  useEffect(() => {
    handleCompletedOutsideBatch()
  }, [completedRelayIds, handleCompletedOutsideBatch])

  const handleFilesSelected = useCallback(
    async (selectedFiles: File[]) => {
      if (!targetObjectId) {
        onError?.(new Error('Target object ID is required'))
        return
      }

      batchesRef.current += 1
      // A new upload is the user's retry for attaches that failed before.
      failedRef.current.clear()
      try {
        // Upload all files in parallel, scoped to this target so its list shows
        // only its own uploads.
        const uploadPromises = selectedFiles.map((file) => uploadFile(file, targetObjectId))
        // allSettled, not all: one paused or failed upload must not discard the
        // ids of the ones that did finish.
        const settled = await Promise.allSettled(uploadPromises)
        const fileRelayIds = settled
          .filter((result) => result.status === 'fulfilled')
          .map((result) => (result as PromiseFulfilledResult<string>).value)

        if (fileRelayIds.length) {
          // Read before the store drops the files: with autoAttach off, the caller
          // needs the tokens to attach anonymous uploads itself.
          onUploadComplete?.(fileRelayIds, uploadTokensFor(fileRelayIds))
        }

        if (autoAttach) {
          attach(fileRelayIds, { clearAfter: true })
        } else {
          // The caller owns these ids now. Drop only this batch's files — a failed
          // upload stays listed so the user can still retry it, and one that
          // finished meanwhile is reported below, not dropped unreported.
          const store = useFileUploadStore.getState()
          Array.from(store.files.values())
            .filter((file) => file.fileRelayId && fileRelayIds.includes(file.fileRelayId))
            .forEach((file) => store.removeFile(file.id))
          setResetKey((prev) => prev + 1)
        }
      } catch (error) {
        onError?.(error instanceof Error ? error : new Error('Upload failed'))
      } finally {
        batchesRef.current -= 1
        // Handle anything that completed outside this batch while it was running.
        handleCompletedOutsideBatch()
      }
    },
    [
      uploadFile,
      autoAttach,
      targetObjectId,
      onUploadComplete,
      onError,
      attach,
      handleCompletedOutsideBatch,
    ],
  )

  return {
    handleFilesSelected,
    isAttaching,
    resetKey,
  }
}
