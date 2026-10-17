type Accept = Record<string, string[]>

export interface FileUploadDropzoneProps {
  onFilesSelected: (files: File[]) => void
  maxFiles?: number
  maxFileSize?: number // in bytes; unlimited when omitted
  acceptedFileTypes?: Accept
  disabled?: boolean
}
