import { UseMutationOptions } from '@tanstack/react-query'

import { IMfaDeactivateRequest } from '../../../types/mfa'

export interface IUseMfaDeactivate {
  options?: UseMutationOptions<void, unknown, IMfaDeactivateRequest, any>
}
