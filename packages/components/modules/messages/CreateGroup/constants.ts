import { z } from 'zod'

import { CreatGroupUpload } from './types'

export const FORM_VALUE: Record<keyof CreatGroupUpload, keyof CreatGroupUpload> = {
  title: 'title',
  participants: 'participants',
  image: 'image',
}

export const DEFAULT_FORM_VALUES: CreatGroupUpload = {
  title: '',
  participants: [],
  image: '',
}

export const DEFAULT_FORM_VALIDATION = z.object({
  [FORM_VALUE.title]: z.string().min(1, { message: 'Please enter a title' }),
  [FORM_VALUE.participants]: z
    .array(z.any())
    .min(1, { message: 'Please select at least one member' }),
  [FORM_VALUE.image]: z.any(),
})

// .svg is not supported by the backend, so better not use 'image/*'
export const DEFAULT_IMAGE_FORMATS = 'image/png, image/gif, image/jpeg'
// use "DEFAULT_IMAGE_MAX_SIZE = undefined" to allow uploads of any size
export const DEFAULT_IMAGE_MAX_SIZE = 10 * 1024 * 1024
