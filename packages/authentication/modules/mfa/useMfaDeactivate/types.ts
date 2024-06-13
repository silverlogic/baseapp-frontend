import { UseMutationOptions } from '@tanstack/react-query'

import MfaApi from '../../../services/mfa'
import { MfaDeactivateRequest } from '../../../types/mfa'

type ApiClass = Pick<typeof MfaApi, 'deactivate'>

export interface UseMfaDeactivateOptions {
  options?: UseMutationOptions<void, unknown, MfaDeactivateRequest, any>
  ApiClass?: ApiClass
}
