import type { UseMutationOptions } from '@tanstack/react-query'
import type { UseFormProps } from 'react-hook-form'

import * as AllAuthTypes from '../../../types/allAuth'

export interface UseAllAuthResetPassword {
  formOptions?: UseFormProps<Partial<AllAuthTypes.ResetPasswordRequest>>
  mutationOptions?: UseMutationOptions<
    AllAuthTypes.SessionInfo,
    unknown,
    AllAuthTypes.ResetPasswordRequest,
    any
  >
  enableFormApiErrors?: boolean
  token?: string
}
