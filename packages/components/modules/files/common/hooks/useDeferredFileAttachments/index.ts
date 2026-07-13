import { useCallback, useRef, useState } from 'react'

import { ConnectionHandler } from 'react-relay'

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
  const { clearCompleted } = useFileUploadStore()
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
      const results = await Promise.allSettled(uploadsRef.current)
      const fileRelayIds = results
        .filter((r): r is PromiseFulfilledResult<string> => r.status === 'fulfilled' && !!r.value)
        .map((r) => r.value)
      uploadsRef.current = []

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
          clearCompleted()
          onDone?.()
        },
        onError: () => {
          onDone?.()
        },
      })
    },
    [attachFiles, clearCompleted],
  )

  const reset = useCallback(() => {
    uploadsRef.current = []
    clearCompleted()
  }, [clearCompleted])

  return { handleFilesSelected, attachTo, reset, isUploading, isAttaching, scope: scopeRef.current }
}
