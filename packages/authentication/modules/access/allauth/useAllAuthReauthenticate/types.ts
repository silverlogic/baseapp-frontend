import type { UseMutationOptions } from '@tanstack/react-query'
import type { UseFormProps } from 'react-hook-form'

import type * as AllAuthTypes from '../../../../types/allAuth'

export interface UseAllAuthReauthenticate {
  formOptions?: UseFormProps<Partial<AllAuthTypes.ReauthenticateRequest>>
  mutationOptions?: UseMutationOptions<
    AllAuthTypes.SessionInfo,
    unknown,
    AllAuthTypes.ReauthenticateRequest,
    any
  >
  enableFormApiErrors?: boolean
}
