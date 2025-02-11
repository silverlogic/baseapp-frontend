import { z } from 'zod'

import { TitleAndImage } from '../__shared__/types'
import { CreateGroupUpload } from './types'

export const FORM_VALUE: Record<keyof CreateGroupUpload, keyof CreateGroupUpload> &
  Record<keyof TitleAndImage, keyof TitleAndImage> = {
  title: 'title',
  participants: 'participants',
  image: 'image',
}

export const DEFAULT_FORM_VALUES: CreateGroupUpload = {
  title: '',
  participants: [],
  image: '',
}

export const DEFAULT_FORM_VALIDATION = z.object({
  [FORM_VALUE.title]: z
    .string()
    .min(1, { message: 'Please enter a title' })
    .max(20, { message: "Title can't be more than 20 characters" }),
  [FORM_VALUE.participants]: z
    .array(z.any())
    .min(1, { message: 'Please select at least one member' }),
  [FORM_VALUE.image]: z.any(),
})
