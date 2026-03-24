import type { UseMutationOptions } from '@tanstack/react-query'
import { z } from 'zod'

import type { ForgotPasswordRequest } from '../../../types/auth'

export interface UseRecoverPasswordOptions {
  validationSchema?: z.ZodType<ForgotPasswordRequest>
  defaultValues?: ForgotPasswordRequest
  options?: UseMutationOptions<void, unknown, ForgotPasswordRequest, any>
  enableFormApiErrors?: boolean
}
