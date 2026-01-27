import type { UseMutationOptions } from '@tanstack/react-query'

import type { AllAuthLoginResponse } from '../../../../types/allauth'

export interface UseAllAuthGoogleLoginOptions {
  backendLoginOptions?: Omit<UseMutationOptions<AllAuthLoginResponse, Error, string>, 'mutationFn'>
}
