import type { UseMutationOptions } from '@tanstack/react-query'

import MfaApi from '../../../services/mfa'
import type { MfaChangePrimaryMethodRequest } from '../../../types/mfa'

type ApiClass = Pick<typeof MfaApi, 'changePrimaryMethod'>

export interface UseMfaChangePrimaryMethodOptions {
  options?: UseMutationOptions<void, unknown, MfaChangePrimaryMethodRequest, any>
  ApiClass?: ApiClass
}
