import type { CustomJWTKeyNames } from '../../../types/auth'

export interface UseLogoutOptions extends CustomJWTKeyNames {
  onLogout?: () => void
  emitLogoutEvent?: boolean
}
