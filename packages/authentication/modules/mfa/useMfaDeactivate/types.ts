import { UseMutationOptions } from '@tanstack/react-query'

import MfaApi from '../../../services/mfa'
import { IMfaDeactivateRequest } from '../../../types/mfa'

type ApiClass = Pick<typeof MfaApi, 'deactivate'>

export interface IUseMfaDeactivate {
  options?: UseMutationOptions<void, unknown, IMfaDeactivateRequest, any>
  ApiClass?: ApiClass
}
