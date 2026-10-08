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
