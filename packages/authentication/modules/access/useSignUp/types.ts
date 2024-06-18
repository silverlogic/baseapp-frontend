import { UseMutationOptions } from '@tanstack/react-query'
import { z } from 'zod'

import AuthApi from '../../../services/auth'
import { RegisterRequest } from '../../../types/auth'

type ApiClass = Pick<typeof AuthApi, 'register'>

export interface UseSignUpOptions<TRegisterRequest = RegisterRequest, TRegisterResponse = void> {
  validationSchema?: z.ZodObject<z.ZodRawShape>
  defaultValues?: TRegisterRequest
  ApiClass?: ApiClass
  options?: UseMutationOptions<TRegisterResponse, unknown, TRegisterRequest, any>
  enableFormApiErrors?: boolean
}
