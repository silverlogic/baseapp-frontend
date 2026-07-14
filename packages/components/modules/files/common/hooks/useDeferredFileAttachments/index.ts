import { useCallback, useRef, useState } from 'react'

import { ConnectionHandler } from 'react-relay'

import { FileUploadStatus } from '../../constants'
import { useFileUploadStore } from '../../context/FileUploadProvider'
import { useFileAttachToTargetMutation } from '../../graphql/mutations/FileAttachToTarget'
import { useChunkedUpload } from '../useChunkedUpload'
import type { UseDeferredFileAttachmentsReturn } from './types'

/**
 * Upload files now, attach them later — for a target that does not exist yet
 * (e.g. a new comment). Files upload immediately via the chunked uploader; the
 * resulting File relay ids are held until attachTo(targetObjectId) runs once the
 * target has been created, then attached in a single mutation.
 */
export const useDeferredFileAttachments = (): UseDeferredFileAttachmentsReturn => {
  const { uploadFile } = useChunkedUpload()
  const [attachFiles, isAttaching] = useFileAttachToTargetMutation()
  const uploadsRef = useRef<Promise<string>[]>([])
  const inFlightRef = useRef(0)
  // Stable per-instance scope so this composer's uploads are shown here and not
  // on unrelated file lists (they share one global upload store).
  const scopeRef = useRef(`deferred-${Math.random().toString(36).slice(2)}`)
  const [isUploading, setIsUploading] = useState(false)

  const handleFilesSelected = useCallback(
    async (files: File[]) => {
      if (!files.length) return

      const promises = files.map((file) => uploadFile(file, scopeRef.current))
      uploadsRef.current.push(...promises)
      inFlightRef.current += 1
      setIsUploading(true)
      try {
        await Promise.allSettled(promises)
      } finally {
        inFlightRef.current -= 1
        if (inFlightRef.current === 0) setIsUploading(false)
      }
    },
    [uploadFile],
  )

  const attachTo = useCallback(
    async (targetObjectId: string, onDone?: () => void) => {
      // Wait for any in-flight uploads so a fast submit still catches them.
      await Promise.allSettled(uploadsRef.current)
      uploadsRef.current = []

      // Read the completed uploads for this composer straight from the store, so
      // any files the user removed before submitting are naturally excluded.
      const store = useFileUploadStore.getState()
      const scoped = Array.from(store.files.values()).filter(
        (file) =>
          file.scope === scopeRef.current &&
          file.status === FileUploadStatus.COMPLETED &&
          !!file.fileRelayId,
      )
      const fileRelayIds = scoped.map((file) => file.fileRelayId as string)

      if (!fileRelayIds.length) {
        onDone?.()
        return
      }

      const connectionID = ConnectionHandler.getConnectionID(targetObjectId, 'FilesList_files')
      attachFiles({
        variables: {
          input: { fileRelayIds, targetObjectId },
          connections: [connectionID],
        },
        onCompleted: () => {
          scoped.forEach((file) => store.removeFile(file.id))
          onDone?.()
        },
        onError: () => {
          onDone?.()
        },
      })
    },
    [attachFiles],
  )

  const reset = useCallback(() => {
    uploadsRef.current = []
    const store = useFileUploadStore.getState()
    Array.from(store.files.values())
      .filter((file) => file.scope === scopeRef.current)
      .forEach((file) => store.removeFile(file.id))
  }, [])

  return { handleFilesSelected, attachTo, reset, isUploading, isAttaching, scope: scopeRef.current }
}
