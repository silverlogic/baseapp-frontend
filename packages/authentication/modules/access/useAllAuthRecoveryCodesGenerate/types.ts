import type { UseMutationOptions } from '@tanstack/react-query'

import * as AllAuthTypes from '../../../types/allAuth'

export interface UseAllAuthRecoveryCodesGenerate {
  mutationOptions?: UseMutationOptions<AllAuthTypes.RecoveryCodesResponse, unknown, void, any>
}
