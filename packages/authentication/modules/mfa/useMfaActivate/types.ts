import type { UseMutationOptions } from '@tanstack/react-query'

import MfaApi from '../../../services/mfa'
import type { MfaActivationResponse, MfaRequest } from '../../../types/mfa'

type ApiClass = Pick<typeof MfaApi, 'activate'>

export interface UseMfaActivateOptions {
  options?: UseMutationOptions<MfaActivationResponse, unknown, Pick<MfaRequest, 'method'>, any>
  ApiClass?: ApiClass
}
