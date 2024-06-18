import { UseMutationOptions } from '@tanstack/react-query'
import { z } from 'zod'

import AuthApi from '../../../services/auth'
import { ForgotPasswordRequest } from '../../../types/auth'

type ApiClass = Pick<typeof AuthApi, 'recoverPassword'>

export interface UseRecoverPasswordOptions {
  validationSchema?: z.ZodObject<z.ZodRawShape>
  defaultValues?: ForgotPasswordRequest
  options?: UseMutationOptions<void, unknown, ForgotPasswordRequest, any>
  ApiClass?: ApiClass
  enableFormApiErrors?: boolean
}
