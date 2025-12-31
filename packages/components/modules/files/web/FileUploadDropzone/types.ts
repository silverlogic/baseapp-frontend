type Accept = Record<string, string[]>

export interface FileUploadDropzoneProps {
  onFilesSelected: (files: File[]) => void
  maxFiles?: number
  maxFileSize?: number // in bytes
  acceptedFileTypes?: Accept
  disabled?: boolean
}
