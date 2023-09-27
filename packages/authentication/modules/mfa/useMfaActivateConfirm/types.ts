import { UseMutationOptions } from '@tanstack/react-query'

import MfaApi from '../../../services/mfa'
import { IMfaConfirmationResponse, IMfaRequest, MfaMethod } from '../../../types/mfa'

type ApiClass = Pick<typeof MfaApi, 'confirmActivation'>

export interface IUseMfaActivateConfirm {
  // TODO: refactor types
  validationSchema?: any
  defaultValues?: Partial<IMfaRequest>
  options?: UseMutationOptions<IMfaConfirmationResponse, unknown, IMfaRequest, any>
  ApiClass?: ApiClass
  method: MfaMethod
}
