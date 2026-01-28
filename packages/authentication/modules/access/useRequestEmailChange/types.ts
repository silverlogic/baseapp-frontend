import type { UseMutationOptions } from '@tanstack/react-query'
import { z } from 'zod'

import AuthApi from '../../../services/auth'
import { ConfirmEmailParams } from '../../../types/auth'

type ApiClass = Pick<
  typeof AuthApi,
  | 'requestEmailChange'
  | 'resendRequestEmailChange'
  | 'verifyEmailChange'
  | 'resendVerifyEmailChange'
  | 'confirmEmailChange'
  | 'cancelEmailChange'
>

export type RequestEmailChangeRequest = {
  newEmail: string
}

export interface UseRequestEmailChange {
  validationSchema?: z.ZodType<RequestEmailChangeRequest>
  defaultValues?: RequestEmailChangeRequest
  requestEmailChangeOptions?: UseMutationOptions<void, unknown, RequestEmailChangeRequest, unknown>
  resendRequestEmailChangeOptions?: UseMutationOptions<void, unknown, void, unknown>
  verifyEmailChangeOptions?: UseMutationOptions<void, unknown, ConfirmEmailParams, unknown>
  resendVerifyEmailChangeOptions?: UseMutationOptions<void, unknown, void, unknown>
  confirmEmailChangeOptions?: UseMutationOptions<void, unknown, ConfirmEmailParams, unknown>
  cancelEmailChangeOptions?: UseMutationOptions<void, unknown, void, unknown>
  ApiClass?: ApiClass
  enableFormApiErrors?: boolean
}
