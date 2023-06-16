import { UseMutationOptions } from '@tanstack/react-query'

import { IRegisterRequest } from '../../../types/auth'

export interface IUseSignUp<TRegisterRequest = IRegisterRequest, TRegisterResponse> {
  // TODO: refactor types
  validationSchema?: any
  defaultValues?: TRegisterRequest
  options?: UseMutationOptions<TRegisterResponse, unknown, TRegisterRequest, any>
}
