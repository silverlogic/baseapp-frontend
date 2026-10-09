import { useCallback, useState } from 'react'

import { useNotification } from '@baseapp-frontend/utils'

import { File } from 'expo-file-system'
import * as ImagePicker from 'expo-image-picker'

import type { Accept } from '../../../common/types'
import {
  describeRejectedFiles,
  filterSelectedFiles,
} from '../../../common/utils/filterSelectedFiles'
import {
  type NativeFileDescriptor,
  createNativeUploadSource,
} from '../../utils/createNativeUploadSource'
import type { UseNativeFilePickerParams, UseNativeFilePickerReturn } from './types'

const isPickerCancel = (error: unknown) => error instanceof Error && /cancel/i.test(error.message)

// The document picker filters by one MIME type; narrow to it only when exactly one
// non-image type is accepted (images go through the photo library instead).
const getDocumentMimeType = (acceptedFileTypes?: Accept) => {
  const documentTypes = Object.keys(acceptedFileTypes ?? {}).filter(
    (mime) => !mime.startsWith('image/'),
  )
  return documentTypes.length === 1 ? documentTypes[0] : undefined
}

/**
 * Native counterpart of `useFileSelect`: opens the photo library or the document
 * picker, applies the same shared selection rules, and hands lazy `UploadSource`s to
 * the shared upload pipeline.
 */
export const useNativeFilePicker = ({
  onFilesSelected,
  maxFiles,
  maxFileSize,
  acceptedFileTypes,
  disabled = false,
}: UseNativeFilePickerParams): UseNativeFilePickerReturn => {
  const { sendToast } = useNotification()
  const [isPreparing, setIsPreparing] = useState(false)

  const deliver = useCallback(
    async (picked: NativeFileDescriptor[]) => {
      const limits = { maxFiles, maxFileSize, acceptedFileTypes }
      const candidates = picked.map((descriptor) => ({
        ...descriptor,
        name: descriptor.name || new File(descriptor.uri).name,
        type: descriptor.type || '',
        size: descriptor.size ?? new File(descriptor.uri).size,
      }))
      const { accepted, rejected } = filterSelectedFiles(candidates, limits)

      const message = describeRejectedFiles(rejected, limits)
      if (message) sendToast(message, { type: 'warning' })
      if (!accepted.length) return

      setIsPreparing(true)
      try {
        // allSettled: one unreadable file must not orphan the copies the others made.
        const settled = await Promise.allSettled(accepted.map(createNativeUploadSource))
        const sources = settled.flatMap((result) =>
          result.status === 'fulfilled' ? [result.value] : [],
        )
        // An empty file has nothing to upload (S3 needs at least one part).
        const readable = sources.filter((source) => source.size > 0)
        sources.filter((source) => source.size === 0).forEach((source) => source.dispose?.())

        if (readable.length < accepted.length) {
          sendToast(
            accepted.length === 1
              ? 'Could not read the selected file.'
              : 'Some files could not be read.',
            { type: 'error' },
          )
        }
        if (readable.length) onFilesSelected(readable)
      } finally {
        setIsPreparing(false)
      }
    },
    [acceptedFileTypes, maxFileSize, maxFiles, onFilesSelected, sendToast],
  )

  const pickImages = useCallback(async () => {
    if (disabled) return
    let result: ImagePicker.ImagePickerResult
    try {
      // The system photo picker needs no library permission (only iOS 10 did).
      result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: 'images',
        allowsMultipleSelection: (maxFiles ?? 2) > 1,
        selectionLimit: maxFiles,
        quality: 1,
        // HEIC -> JPEG, so web viewers and backend thumbnails can read it.
        preferredAssetRepresentationMode:
          ImagePicker.UIImagePickerPreferredAssetRepresentationMode.Compatible,
      })
    } catch {
      sendToast('Could not open the photo library.', { type: 'error' })
      return
    }
    if (result.canceled) return

    await deliver(
      result.assets.map((asset) => ({
        uri: asset.uri,
        name: asset.fileName,
        type: asset.mimeType,
        size: asset.fileSize,
      })),
    )
  }, [deliver, disabled, maxFiles, sendToast])

  const pickDocuments = useCallback(async () => {
    if (disabled) return
    try {
      const picked = await File.pickFileAsync(undefined, getDocumentMimeType(acceptedFileTypes))
      const files = Array.isArray(picked) ? picked : [picked]
      await deliver(
        files.map((file) => ({ uri: file.uri, name: file.name, type: file.type, size: file.size })),
      )
    } catch (error) {
      if (!isPickerCancel(error)) {
        sendToast('Could not open the file picker.', { type: 'error' })
      }
    }
  }, [acceptedFileTypes, deliver, disabled, sendToast])

  return { pickImages, pickDocuments, isPreparing }
}

export type { UseNativeFilePickerParams, UseNativeFilePickerReturn } from './types'
