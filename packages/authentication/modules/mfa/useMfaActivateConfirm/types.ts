import type { UseMutationOptions } from '@tanstack/react-query'
import { z } from 'zod'

import MfaApi from '../../../services/mfa'
import type { MfaConfirmationResponse, MfaMethod, MfaRequest } from '../../../types/mfa'

type ApiClass = Pick<typeof MfaApi, 'confirmActivation'>

export interface UseMfaActivateConfirmOptions {
  validationSchema?: z.ZodObject<z.ZodRawShape>
  defaultValues?: Partial<MfaRequest>
  options?: UseMutationOptions<MfaConfirmationResponse, unknown, MfaRequest, any>
  ApiClass?: ApiClass
  method: MfaMethod
  enableFormApiErrors?: boolean
}
