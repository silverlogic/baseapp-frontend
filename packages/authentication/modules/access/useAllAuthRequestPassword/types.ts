import type { UseMutationOptions } from '@tanstack/react-query'
import type { UseFormProps } from 'react-hook-form'

import * as AllAuthTypes from '../../../types/allAuth'

export interface UseAllAuthRequestPassword {
  formOptions?: UseFormProps<Partial<AllAuthTypes.RequestPasswordResetRequest>>
  mutationOptions?: UseMutationOptions<
    AllAuthTypes.RequestPasswordResetResponse,
    unknown,
    AllAuthTypes.RequestPasswordResetRequest,
    any
  >
  enableFormApiErrors?: boolean
}
