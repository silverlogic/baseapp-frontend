import type { UseMutationOptions } from '@tanstack/react-query'
import type { UseFormProps } from 'react-hook-form'

import * as AllAuthTypes from '../../../types/allAuth'
import type { CustomJWTKeyNames } from '../../../types/auth'

export interface UseAllAuthLogin extends CustomJWTKeyNames {
  formOptions?: UseFormProps<Partial<AllAuthTypes.LoginRequest>>
  mutationOptions?: UseMutationOptions<
    AllAuthTypes.SessionInfo,
    unknown,
    AllAuthTypes.LoginRequest,
    any
  >
  enableFormApiErrors?: boolean
}
