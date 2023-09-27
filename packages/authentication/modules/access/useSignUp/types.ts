import { UseMutationOptions } from '@tanstack/react-query'

import AuthApi from '../../../services/auth'
import { IRegisterRequest } from '../../../types/auth'

type ApiClass = Pick<typeof AuthApi, 'register'>

export interface IUseSignUp<TRegisterRequest = IRegisterRequest, TRegisterResponse = void> {
  // TODO: refactor types
  validationSchema?: any
  defaultValues?: TRegisterRequest
  ApiClass?: ApiClass
  options?: UseMutationOptions<TRegisterResponse, unknown, TRegisterRequest, any>
}
