import z from 'zod'

import {
  CREATE_OR_EDIT_GROUP_FORM_VALUE,
  DEFAULT_CREATE_OR_EDIT_GROUP_FORM_VALIDATION,
} from '../../common/constants'
import { CreateOrEditGroup } from '../../common/types'

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
