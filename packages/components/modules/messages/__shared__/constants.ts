import { ValueOf } from '@baseapp-frontend/utils'

import { z } from 'zod'

import { TitleAndImage } from '.'
import { CreateOrEditGroup } from './types'

export const CHAT_ROOM_PARTICIPANT_ROLES = {
  admin: 'ADMIN',
  member: 'MEMBER',
} as const

export type ChatRoomParticipantRoles = ValueOf<typeof CHAT_ROOM_PARTICIPANT_ROLES>

export const ADMIN_LABEL = 'Admin'

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
  [CREATE_OR_EDIT_GROUP_FORM_VALUE.title]: z.string().min(1, { message: 'Please enter a title' }),
  [CREATE_OR_EDIT_GROUP_FORM_VALUE.addParticipants]: z.array(z.any()),
  [CREATE_OR_EDIT_GROUP_FORM_VALUE.participants]: z
    .array(z.any())
    .min(1, { message: 'Please select at least one member' }),
  [CREATE_OR_EDIT_GROUP_FORM_VALUE.removeParticipants]: z.array(z.any()),
  [CREATE_OR_EDIT_GROUP_FORM_VALUE.image]: z.any(),
})
