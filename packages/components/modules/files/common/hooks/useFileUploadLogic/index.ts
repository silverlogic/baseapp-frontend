import { useCallback, useEffect, useRef, useState } from 'react'

import { ConnectionHandler } from 'react-relay'
import { useShallow } from 'zustand/react/shallow'

import { FileUploadStatus } from '../../constants'
import { useFileUploadStore } from '../../context/FileUploadProvider'
import { useFileAttachToTargetMutation } from '../../graphql/mutations/FileAttachToTarget'
import type { FileUploadProgress } from '../../types'
import { useChunkedUpload } from '../useChunkedUpload'
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
  const [attachFiles, isAttaching] = useFileAttachToTargetMutation()
  const [resetKey, setResetKey] = useState(0)

  // Relay ids already sent to the attach mutation, so a late completion that the
  // batch below already covered is not attached twice.
  const attachedRef = useRef<Set<string>>(new Set())
  // Batches in flight; while one is running it owns every file that completes.
  const batchesRef = useRef(0)

  const attach = useCallback(
    (fileRelayIds: string[], { clearAfter }: AttachOptions) => {
      const fresh = fileRelayIds.filter((id) => !attachedRef.current.has(id))
      if (!fresh.length || !targetObjectId) return

      fresh.forEach((id) => attachedRef.current.add(id))
      const connectionID = ConnectionHandler.getConnectionID(targetObjectId, 'FilesList_files')

      attachFiles({
        variables: {
          input: { fileRelayIds: fresh, targetObjectId },
          connections: [connectionID],
        },
        onCompleted: () => {
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
        onError: (error) => {
          // Allow a retry of the same file to attach again.
          fresh.forEach((id) => attachedRef.current.delete(id))
          onError?.(error)
        },
      })
    },
    [attachFiles, targetObjectId, onAttachComplete, onError],
  )

  const { uploadFile } = useChunkedUpload()

  // Resume/retry finish outside the original batch, started from the list item's own
  // useChunkedUpload, so no callback here sees them. Pick them up from the store
  // instead; while a batch runs it attaches its own files and this waits.
  const attachCompletedOutsideBatch = useCallback(() => {
    if (!autoAttach || !targetObjectId || batchesRef.current > 0) return
    attach(completedRelayIdsIn(useFileUploadStore.getState().files.values(), targetObjectId), {
      clearAfter: false,
    })
  }, [autoAttach, targetObjectId, attach])

  const completedRelayIds = useFileUploadStore(
    useShallow((state) =>
      autoAttach && targetObjectId ? completedRelayIdsIn(state.files.values(), targetObjectId) : [],
    ),
  )

  useEffect(() => {
    attachCompletedOutsideBatch()
  }, [completedRelayIds, attachCompletedOutsideBatch])

  const handleFilesSelected = useCallback(
    async (selectedFiles: File[]) => {
      if (!targetObjectId) {
        onError?.(new Error('Target object ID is required'))
        return
      }

      batchesRef.current += 1
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
          onUploadComplete?.(fileRelayIds)
        }

        if (autoAttach) {
          attach(fileRelayIds, { clearAfter: true })
        } else {
          // The caller owns these ids now. Drop only the finished ones — a failed
          // upload stays listed so the user can still retry it.
          const store = useFileUploadStore.getState()
          Array.from(store.files.values())
            .filter(
              (file) => file.scope === targetObjectId && file.status === FileUploadStatus.COMPLETED,
            )
            .forEach((file) => store.removeFile(file.id))
          setResetKey((prev) => prev + 1)
        }
      } catch (error) {
        onError?.(error instanceof Error ? error : new Error('Upload failed'))
      } finally {
        batchesRef.current -= 1
        // Attach anything that completed outside this batch while it was running.
        attachCompletedOutsideBatch()
      }
    },
    [
      uploadFile,
      autoAttach,
      targetObjectId,
      onUploadComplete,
      onError,
      attach,
      attachCompletedOutsideBatch,
    ],
  )

  return {
    handleFilesSelected,
    isAttaching,
    resetKey,
  }
}
