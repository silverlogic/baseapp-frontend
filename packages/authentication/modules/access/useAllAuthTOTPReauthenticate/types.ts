import type { UseMutationOptions } from '@tanstack/react-query'
import type { UseFormProps } from 'react-hook-form'

import * as AllAuthTypes from '../../../types/allAuth'

export interface UseAllAuthTOTPReauthenticate {
  formOptions?: UseFormProps<Partial<AllAuthTypes.TOTPReauthenticateRequest>>
  mutationOptions?: UseMutationOptions<
    AllAuthTypes.SessionInfo,
    unknown,
    AllAuthTypes.TOTPReauthenticateRequest,
    any
  >
  enableFormApiErrors?: boolean
}
