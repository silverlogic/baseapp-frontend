import z from 'zod'

import { CreateOrEditGroup, TitleAndImage } from './types'

export const CREATE_OR_EDIT_GROUP_FORM_VALUE: Record<
  keyof CreateOrEditGroup,
  keyof CreateOrEditGroup
> &
  Record<keyof TitleAndImage, keyof TitleAndImage> = {
  title: 'title',
  participants: 'participants',
  addParticipants: 'addParticipants',
  removeParticipants: 'removeParticipants',
  image: 'image',
}

export const DEFAULT_CREATE_OR_EDIT_GROUP_FORM_VALUE: CreateOrEditGroup = {
  title: '',
  addParticipants: [],
  participants: [],
  removeParticipants: [],
  image: '',
}

export const DEFAULT_CREATE_OR_EDIT_GROUP_FORM_VALIDATION = z.object({
  [CREATE_OR_EDIT_GROUP_FORM_VALUE.title]: z
    .string()
    .min(1, { message: 'Please enter a title' })
    .max(20, { message: "Title can't be more than 20 characters" }),
  [CREATE_OR_EDIT_GROUP_FORM_VALUE.addParticipants]: z.array(z.any()),
  [CREATE_OR_EDIT_GROUP_FORM_VALUE.participants]: z
    .array(z.any())
    .min(1, { message: 'Please select at least one member' }),
  [CREATE_OR_EDIT_GROUP_FORM_VALUE.removeParticipants]: z.array(z.any()),
  [CREATE_OR_EDIT_GROUP_FORM_VALUE.image]: z.any(),
})

export const getDefaultFormValues = (
  title: string,
  image: string | undefined,
): CreateOrEditGroup => ({
  title,
  addParticipants: [],
  removeParticipants: [],
  image,
})

export const DEFAULT_FORM_VALIDATION = z.object({
  ...DEFAULT_CREATE_OR_EDIT_GROUP_FORM_VALIDATION.shape,
  [CREATE_OR_EDIT_GROUP_FORM_VALUE.participants]: z.any(),
}) as any // TODO: fix typing issue with zodResolver

export const MAXIMUM_DIFF_TO_GROUP_MESSAGES_CREATED_TIME = 3 // in minutes

export const ADMIN_LABEL = 'Admin'
