import type { UseMutationOptions } from '@tanstack/react-query'

import * as AllAuthTypes from '../../../types/allAuth'

export interface UseAllAuthTOTPAuthenticatorDeactivate {
  mutationOptions?: UseMutationOptions<
    AllAuthTypes.DeactivateTOTPAuthenticatorResponse,
    unknown,
    void,
    any
  >
}
