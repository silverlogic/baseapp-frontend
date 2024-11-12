import type { UseMutationOptions } from '@tanstack/react-query'
import type { UseFormProps } from 'react-hook-form'

import type * as AllAuthTypes from '../../../../types/allAuth'
import type { CustomJWTKeyNames } from '../../../../types/auth'

export interface UseAllAuthRecoveryCodeAuthenticate extends CustomJWTKeyNames {
  formOptions?: UseFormProps<Partial<AllAuthTypes.RecoveryCodeAuthenticateRequest>>
  mutationOptions?: UseMutationOptions<
    AllAuthTypes.SessionInfo,
    unknown,
    AllAuthTypes.RecoveryCodeAuthenticateRequest,
    any
  >
  enableFormApiErrors?: boolean
}
