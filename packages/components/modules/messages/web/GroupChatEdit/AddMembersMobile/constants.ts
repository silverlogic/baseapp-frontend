import z from 'zod'

import {
  CREATE_OR_EDIT_GROUP_FORM_VALUE,
  DEFAULT_CREATE_OR_EDIT_GROUP_FORM_VALIDATION,
} from '../../../common/constants'

export const DEFAULT_FORM_VALIDATION = z.object({
  ...DEFAULT_CREATE_OR_EDIT_GROUP_FORM_VALIDATION.shape,
  [CREATE_OR_EDIT_GROUP_FORM_VALUE.title]: z.string(),
})
