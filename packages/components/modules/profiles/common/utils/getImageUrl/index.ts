// TODO: maybe move this to  @baseapp-frontend/utils
export const getImageUrl = (image?: string | File | Blob | MediaSource | null) => {
  if (typeof image === 'string') return image
  if (image instanceof Blob) return URL.createObjectURL(image)
  return ''
}
