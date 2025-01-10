import { z } from 'zod'

import { CreateGroupUpload } from './types'

export const FORM_VALUE: Record<keyof CreateGroupUpload, keyof CreateGroupUpload> = {
  title: 'title',
  participants: 'participants',
  image: 'image',
}

export const DEFAULT_FORM_VALUES: CreateGroupUpload = {
  title: '', // Why is this not [FORM_VALUE.title]: ''
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
