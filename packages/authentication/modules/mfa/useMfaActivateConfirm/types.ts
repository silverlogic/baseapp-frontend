import { UseMutationOptions } from '@tanstack/react-query'
import { z } from 'zod'

import MfaApi from '../../../services/mfa'
import { IMfaConfirmationResponse, IMfaRequest, MfaMethod } from '../../../types/mfa'

type ApiClass = Pick<typeof MfaApi, 'confirmActivation'>

export interface IUseMfaActivateConfirm {
  validationSchema?: z.ZodObject<z.ZodRawShape>
  defaultValues?: Partial<IMfaRequest>
  options?: UseMutationOptions<IMfaConfirmationResponse, unknown, IMfaRequest, any>
  ApiClass?: ApiClass
  method: MfaMethod
  enableFormApiErrors?: boolean
}
