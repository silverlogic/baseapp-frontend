import { z } from 'zod'

import { TitleAndImage } from '../__shared__/types'
import { EditGroupUpload } from './types'

export const FORM_VALUE: Record<keyof EditGroupUpload, keyof EditGroupUpload> &
  Record<keyof TitleAndImage, keyof TitleAndImage> = {
  title: 'title',
  addParticipants: 'addParticipants',
  removeParticipants: 'removeParticipants',
  image: 'image',
}

export const getDefaultFormValues = (
  title: string,
  image: string | undefined,
): EditGroupUpload => ({
  title,
  addParticipants: [],
  removeParticipants: [],
  image,
})

export const DEFAULT_FORM_VALIDATION = z.object({
  [FORM_VALUE.title]: z
    .string()
    .min(1, { message: 'Please enter a title' })
    .max(20, { message: "Title can't be more than 20 characters" }),
  [FORM_VALUE.addParticipants]: z.array(z.any()),
  [FORM_VALUE.removeParticipants]: z.array(z.any()),
  [FORM_VALUE.image]: z.any(),
})
