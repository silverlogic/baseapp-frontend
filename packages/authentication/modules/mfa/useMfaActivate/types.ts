import { UseMutationOptions } from '@tanstack/react-query'

import MfaApi from '../../../services/mfa'
import { IMfaActivationResponse, IMfaRequest } from '../../../types/mfa'

type ApiClass = Pick<typeof MfaApi, 'activate'>

export interface IUseMfaActivate {
  options?: UseMutationOptions<IMfaActivationResponse, unknown, Pick<IMfaRequest, 'method'>, any>
  ApiClass?: ApiClass
}
