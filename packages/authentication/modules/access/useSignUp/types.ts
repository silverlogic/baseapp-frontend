import { UseMutationOptions } from '@tanstack/react-query'
import { z } from 'zod'

import AuthApi from '../../../services/auth'
import { IRegisterRequest } from '../../../types/auth'

type ApiClass = Pick<typeof AuthApi, 'register'>

export interface IUseSignUp<TRegisterRequest = IRegisterRequest, TRegisterResponse = void> {
  validationSchema?: z.ZodObject<z.ZodRawShape>
  defaultValues?: TRegisterRequest
  ApiClass?: ApiClass
  options?: UseMutationOptions<TRegisterResponse, unknown, TRegisterRequest, any>
  enableFormApiErrors?: boolean
}
