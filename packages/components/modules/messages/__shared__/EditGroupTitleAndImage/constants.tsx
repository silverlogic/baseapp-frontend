// .svg is not supported by the backend, so better not use 'image/*'
export const DEFAULT_IMAGE_FORMATS = 'image/png, image/gif, image/jpeg'
// use "DEFAULT_IMAGE_MAX_SIZE = undefined" to allow uploads of any size
export const DEFAULT_IMAGE_MAX_SIZE = 10 * 1024 * 1024
