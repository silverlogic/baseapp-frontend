import type { UseMutationOptions } from '@tanstack/react-query'
import type { UseFormProps } from 'react-hook-form'

import type * as AllAuthTypes from '../../../../types/allAuth'

export interface UseAllAuthLoginEmailCode {
  formOptions?: UseFormProps<Partial<AllAuthTypes.RequestLoginEmailCodeRequest>>
  mutationOptions?: UseMutationOptions<
    AllAuthTypes.SessionInfo,
    unknown,
    AllAuthTypes.RequestLoginEmailCodeRequest,
    any
  >
  enableFormApiErrors?: boolean
}
