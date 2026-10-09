import { File, Paths } from 'expo-file-system'
import { copyAsync } from 'expo-file-system/legacy'

import type { UploadSource } from '../../common/types'
import { nextLocalId } from '../../common/utils/localId'

export interface NativeFileDescriptor {
  uri: string
  name?: string | null
  type?: string | null
  size?: number | null
}

const deleteQuietly = (file: File) => {
  try {
    if (file.exists) file.delete()
  } catch {
    // Cache cleanup is best-effort; the OS trims the cache directory anyway.
  }
}

// Android pickers hand back content:// URIs, which FileHandle cannot open. The legacy
// copy streams them through the ContentResolver into a plain cache file we then own.
const toReadableFile = async (uri: string): Promise<{ file: File; isCopy: boolean }> => {
  if (!uri.startsWith('content://')) return { file: new File(uri), isCopy: false }
  const copy = new File(Paths.cache, `upload-${nextLocalId()}`)
  try {
    await copyAsync({ from: uri, to: copy.uri })
  } catch (error) {
    deleteQuietly(copy)
    throw error
  }
  return { file: copy, isCopy: true }
}

/**
 * Builds an `UploadSource` over a picked file. Each chunk is read on demand through a
 * short-lived `FileHandle`, so only the chunks currently uploading are held in memory.
 */
export const createNativeUploadSource = async ({
  uri,
  name,
  type,
}: NativeFileDescriptor): Promise<UploadSource> => {
  const original = new File(uri)
  const { file, isCopy } = await toReadableFile(uri)

  return {
    name: name || original.name,
    // The bytes on disk, not the picker's metadata: chunks are cut from this file.
    size: file.size,
    type: type || original.type || 'application/octet-stream',
    readChunk: async (start, end) => {
      const handle = file.open()
      try {
        handle.offset = start
        return handle.readBytes(end - start)
      } finally {
        handle.close()
      }
    },
    dispose: isCopy ? () => deleteQuietly(file) : undefined,
  }
}
