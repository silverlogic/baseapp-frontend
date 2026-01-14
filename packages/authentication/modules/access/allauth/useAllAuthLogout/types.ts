import type { CustomJWTKeyNames } from '../../../../types/auth'

export interface UseAllAuthLogoutOptions extends CustomJWTKeyNames {
  onLogout?: () => void
  emitLogoutEvent?: boolean
}
