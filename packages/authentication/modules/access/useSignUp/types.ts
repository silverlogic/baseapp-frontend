import { UseMutationOptions } from '@tanstack/react-query'
import { UseFormProps } from 'react-hook-form'

import AuthApi from '../../../services/auth'
import { RegisterRequest } from '../../../types/auth'

type ApiClass = Pick<typeof AuthApi, 'register'>

export interface UseSignUpOptions<TRegisterRequest = RegisterRequest, TRegisterResponse = void> {
  formOptions?: UseFormProps<Partial<TRegisterRequest>>
  defaultValues?: TRegisterRequest
  ApiClass?: ApiClass
  options?: UseMutationOptions<TRegisterResponse, unknown, TRegisterRequest, any>
  enableFormApiErrors?: boolean
}
