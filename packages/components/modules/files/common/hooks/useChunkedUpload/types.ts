export interface UseChunkedUploadOptions {
  onUploadComplete?: (fileId: string, fileRelayId: string) => void
  onUploadError?: (fileId: string, error: Error) => void
  onUploadProgress?: (fileId: string, progress: number) => void
}
