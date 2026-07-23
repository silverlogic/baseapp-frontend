/**
 * Format bytes to human-readable file size
 */
export const formatFileSize = (bytes: number | null | undefined): string => {
  if (!bytes) return '0 B'
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`
}

/**
 * Format date string to localized date
 */
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString)
  return date.toLocaleDateString()
}

/**
 * Get file type category from content type
 */
export const getFileType = (
  contentType: string | null | undefined,
): 'image' | 'video' | 'pdf' | 'other' => {
  if (!contentType) return 'other'

  if (contentType.startsWith('image/')) return 'image'
  if (contentType.startsWith('video/')) return 'video'
  if (contentType === 'application/pdf') return 'pdf'

  return 'other'
}

/**
 * Calculate upload progress percentage
 */
export const calculateProgress = (uploadedBytes: number, totalBytes: number): number => {
  if (totalBytes === 0) return 0
  return (uploadedBytes / totalBytes) * 100
}

/**
 * Check if file is an image
 */
export const isImageFile = (contentType: string | null | undefined): boolean =>
  contentType?.startsWith('image/') ?? false
