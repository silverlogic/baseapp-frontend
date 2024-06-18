import { CustomCookieNames } from '../../../types/auth'

export interface UseLogoutOptions extends CustomCookieNames {
  onLogout?: () => void
  emitLogoutEvent?: boolean
}
