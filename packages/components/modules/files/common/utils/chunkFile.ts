import { CHUNK_SIZE } from '../constants'

export function chunkFile(file: File, chunkSize = CHUNK_SIZE): Blob[] {
  const chunks: Blob[] = []
  let offset = 0

  while (offset < file.size) {
    chunks.push(file.slice(offset, offset + chunkSize))
    offset += chunkSize
  }

  return chunks
}

/** How many parts `size` bytes splits into — the count `chunkFile` would produce. */
export const getChunkCount = (size: number, chunkSize = CHUNK_SIZE): number =>
  Math.ceil(size / chunkSize)
