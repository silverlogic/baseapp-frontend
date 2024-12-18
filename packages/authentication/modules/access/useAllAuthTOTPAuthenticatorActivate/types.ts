import type { UseMutationOptions } from '@tanstack/react-query'
import type { UseFormProps } from 'react-hook-form'

import * as AllAuthTypes from '../../../types/allAuth'

export interface UseAllAuthTOTPAuthenticatorActivate {
  formOptions?: UseFormProps<Partial<AllAuthTypes.ActivateTOTPAuthenticatorRequest>>
  mutationOptions?: UseMutationOptions<
    AllAuthTypes.ActivateTOTPAuthenticatorResponse,
    unknown,
    AllAuthTypes.ActivateTOTPAuthenticatorRequest,
    any
  >
  enableFormApiErrors?: boolean
}
