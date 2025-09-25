import type { UseMutationOptions } from '@tanstack/react-query'
import { z } from 'zod'

import AuthApi from '../../../services/auth'
import type { ForgotPasswordRequest } from '../../../types/auth'

type ApiClass = Pick<typeof AuthApi, 'recoverPassword'>

export interface UseRecoverPasswordOptions {
  validationSchema?: z.ZodType<ForgotPasswordRequest>
  defaultValues?: ForgotPasswordRequest
  options?: UseMutationOptions<void, unknown, ForgotPasswordRequest, any>
  ApiClass?: ApiClass
  enableFormApiErrors?: boolean
}
