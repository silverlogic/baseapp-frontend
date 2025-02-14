import { z } from 'zod'

import { ProfileUpdateForm } from './types'
import { PROFILE_FORM_VALIDATION } from './zod'

export const PROFILE_FORM_VALUE: Record<keyof ProfileUpdateForm, keyof ProfileUpdateForm> = {
  id: 'id',
  bannerImage: 'bannerImage',
  biography: 'biography',
  image: 'image',
  name: 'name',
  phoneNumber: 'phoneNumber',
  urlPath: 'urlPath',
}

export const DEFAULT_PROFILE_FORM_VALUES: ProfileUpdateForm = {
  id: '',
  bannerImage: '',
  biography: '',
  image: '',
  name: '',
  phoneNumber: '',
  urlPath: '',
}

export const DEFAULT_PROFILE_FORM_VALIDATION = z.object({
  [PROFILE_FORM_VALUE.id]: z.any(),
  [PROFILE_FORM_VALUE.bannerImage]: z.any(),
  [PROFILE_FORM_VALUE.biography]: z.string(),
  [PROFILE_FORM_VALUE.image]: z.any(),
  [PROFILE_FORM_VALUE.name]: z.string().min(1, { message: PROFILE_FORM_VALIDATION.name.empty }),
  [PROFILE_FORM_VALUE.phoneNumber]: z.string(),
  [PROFILE_FORM_VALUE.urlPath]: z
    .string()
    .min(8, { message: PROFILE_FORM_VALIDATION.urlPath.empty })
    .regex(/^[a-zA-Z0-9]+$/, { message: PROFILE_FORM_VALIDATION.urlPath.invalid }),
})

// .svg is not supported by the backend, so better not use 'image/*'
export const DEFAULT_IMAGE_FORMATS = 'image/png, image/gif, image/jpeg'
// use "DEFAULT_IMAGE_MAX_SIZE = undefined" to allow uploads of any size
export const DEFAULT_IMAGE_MAX_SIZE = 10 * 1024 * 1024
export const DEFAULT_BANNER_IMAGE_FORMATS = 'image/png, image/gif, image/jpeg'
// use "DEFAULT_BANNER_IMAGE_MAX_SIZE = undefined" to allow uploads of any size
export const DEFAULT_BANNER_IMAGE_MAX_SIZE = 10 * 1024 * 1024
