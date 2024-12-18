import type { UseMutationOptions } from '@tanstack/react-query'
import type { UseFormProps } from 'react-hook-form'

import * as AllAuthTypes from '../../../types/allAuth'
import type { CustomJWTKeyNames } from '../../../types/auth'

export interface UseAllAuthVerifyEmailCodeConfirm extends CustomJWTKeyNames {
  formOptions?: UseFormProps<Partial<AllAuthTypes.VerifyEmailRequest>>
  mutationOptions?: UseMutationOptions<
    AllAuthTypes.SessionInfo,
    unknown,
    AllAuthTypes.VerifyEmailRequest,
    any
  >
  enableFormApiErrors?: boolean
}
