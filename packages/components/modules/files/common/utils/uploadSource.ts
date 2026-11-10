import type { UploadInput, UploadSource } from '../types'

export const isUploadSource = (input: UploadInput): input is UploadSource =>
  typeof (input as UploadSource).readChunk === 'function'

/**
 * Normalise anything the uploader accepts into an `UploadSource`. A web `File` reads
 * through `Blob.slice`, which is already lazy, so this adds no copy.
 */
export const toUploadSource = (input: UploadInput): UploadSource => {
  if (isUploadSource(input)) return input

  const file = input
  return {
    name: file.name,
    size: file.size,
    type: file.type,
    readChunk: async (start, end) => file.slice(start, end),
  }
}
