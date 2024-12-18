import type { CustomJWTKeyNames } from '../../../types/auth'

export interface UseAllAuthLogout extends CustomJWTKeyNames {
  onSuccess?: () => void
  emitLogoutEvent?: boolean
}
