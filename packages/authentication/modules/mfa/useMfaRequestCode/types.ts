import type { UseMutationOptions } from '@tanstack/react-query'

import MfaApi from '../../../services/mfa'
import type { MfaRequestCodeRequest, MfaRequestCodeResponse } from '../../../types/mfa'

type ApiClass = Pick<typeof MfaApi, 'sendCode'>

export interface UseMfaRequestCodeOptions {
  options?: UseMutationOptions<MfaRequestCodeResponse, unknown, MfaRequestCodeRequest | void, any>
  ApiClass?: ApiClass
}
