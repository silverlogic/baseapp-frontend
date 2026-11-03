import type { UseMutationOptions } from '@tanstack/react-query'

import MfaApi from '../../../services/mfa'
import type { MfaBackupCodesResponse, MfaRegenerateBackupCodesRequest } from '../../../types/mfa'

type ApiClass = Pick<typeof MfaApi, 'regenerateBackupCodes'>

export interface UseMfaRegenerateBackupCodesOptions {
  options?: UseMutationOptions<
    MfaBackupCodesResponse,
    unknown,
    MfaRegenerateBackupCodesRequest,
    any
  >
  ApiClass?: ApiClass
}
