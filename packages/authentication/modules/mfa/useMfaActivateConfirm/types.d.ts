import { UseMutationOptions } from '@tanstack/react-query'

import { IMfaConfirmationResponse, IMfaRequest, MfaMethod } from '../../../types/mfa'

export interface IUseMfaActivateConfirm {
  // TODO: refactor types
  validationSchema?: any
  defaultValues?: Partial<IMfaRequest>
  options?: UseMutationOptions<IMfaConfirmationResponse, unknown, IMfaRequest, any>
  method: MfaMethod
}
