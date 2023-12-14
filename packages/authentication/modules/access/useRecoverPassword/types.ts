import { UseMutationOptions } from '@tanstack/react-query'
import { z } from 'zod'

import AuthApi from '../../../services/auth'
import { IForgotPasswordRequest } from '../../../types/auth'

type ApiClass = Pick<typeof AuthApi, 'recoverPassword'>

export interface IUseRecoverPassword {
  validationSchema?: z.ZodObject<z.ZodRawShape>
  defaultValues?: IForgotPasswordRequest
  options?: UseMutationOptions<void, unknown, IForgotPasswordRequest, any>
  ApiClass?: ApiClass
  enableFormApiErrors?: boolean
}
