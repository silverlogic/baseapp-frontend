import type { UseMutationOptions } from '@tanstack/react-query'
import type { UseFormProps } from 'react-hook-form'

import type * as AllAuthTypes from '../../../../types/allAuth'

export interface UseAllAuthRecoveryCodeReauthenticate {
  formOptions?: UseFormProps<Partial<AllAuthTypes.RecoveryCodeReauthenticateRequest>>
  mutationOptions?: UseMutationOptions<
    AllAuthTypes.SessionInfo,
    unknown,
    AllAuthTypes.RecoveryCodeReauthenticateRequest,
    any
  >
  enableFormApiErrors?: boolean
}
