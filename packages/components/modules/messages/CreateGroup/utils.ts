export const getImageUrl = (image?: string | File | Blob | string[] | MediaSource | null) => {
  if (typeof image === 'string') return image
  if (image instanceof Blob) return URL.createObjectURL(image)
  return ''
}
