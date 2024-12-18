import type { UseMutationOptions } from '@tanstack/react-query'
import type { UseFormProps } from 'react-hook-form'

import * as AllAuthTypes from '../../../types/allAuth'
import type { CustomJWTKeyNames } from '../../../types/auth'

export interface UseAllAuthSignUp extends CustomJWTKeyNames {
  formOptions?: UseFormProps<Partial<AllAuthTypes.SignUpRequest>>
  mutationOptions?: UseMutationOptions<
    AllAuthTypes.SessionInfo,
    unknown,
    AllAuthTypes.SignUpRequest,
    any
  >
  enableFormApiErrors?: boolean
}
