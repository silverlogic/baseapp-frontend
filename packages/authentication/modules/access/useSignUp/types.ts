import type { UseMutationOptions } from '@tanstack/react-query'
import type { UseFormProps } from 'react-hook-form'

import AuthApi from '../../../services/auth'
import type { RegisterRequest } from '../../../types/auth'
import type { AuthError, AuthResult } from '../../auth-strategy/types'

type ApiClass = Pick<typeof AuthApi, 'register'>

export interface UseSignUpOptions<TRegisterRequest extends RegisterRequest = RegisterRequest> {
  formOptions?: UseFormProps<Partial<TRegisterRequest>>
  defaultValues?: TRegisterRequest
  ApiClass?: ApiClass
  options?: UseMutationOptions<AuthResult, AuthError | Error, TRegisterRequest, unknown>
  enableFormApiErrors?: boolean
  useNameField?: boolean
}
