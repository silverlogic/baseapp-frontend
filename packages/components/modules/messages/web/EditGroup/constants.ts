<<<<<<< HEAD:packages/components/modules/messages/web/EditGroup/constants.ts
import { CreateOrEditGroup } from '../__shared__/types/types'
=======
import z from 'zod'

import {
  CREATE_OR_EDIT_GROUP_FORM_VALUE,
  DEFAULT_CREATE_OR_EDIT_GROUP_FORM_VALIDATION,
} from '../__shared__/constants'
import { CreateOrEditGroup } from '../__shared__/types'
>>>>>>> f82cdb0 (feat: add members to existing group):packages/components/modules/messages/EditGroup/constants.ts

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
})
