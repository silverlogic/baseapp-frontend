import { IntlShape } from 'react-intl'
import z from 'zod'

import {
  CREATE_OR_EDIT_GROUP_FORM_VALUE,
  DEFAULT_CREATE_OR_EDIT_GROUP_FORM_VALIDATION,
} from '../../../common/constants'
import { getCreateOrEditGroupFormValidation } from '../../__shared__/constants'

export const DEFAULT_FORM_VALIDATION = z.object({
  ...DEFAULT_CREATE_OR_EDIT_GROUP_FORM_VALIDATION.shape,
  [CREATE_OR_EDIT_GROUP_FORM_VALUE.title]: z.string(),
})

export const getFormValidation = (intl: IntlShape) =>
  z.object({
    ...getCreateOrEditGroupFormValidation(intl).shape,
    [CREATE_OR_EDIT_GROUP_FORM_VALUE.title]: z.string(),
  })
