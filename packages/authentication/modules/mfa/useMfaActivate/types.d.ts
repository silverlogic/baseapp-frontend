import { UseMutationOptions } from '@tanstack/react-query'

import { IMfaActivationResponse, IMfaRequest } from '../../../types/mfa'

export interface IUseMfaActivate {
  options?: UseMutationOptions<IMfaActivationResponse, unknown, Pick<IMfaRequest, 'method'>, any>
}
