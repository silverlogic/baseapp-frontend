import { ICookieName } from '../../../types/auth'

export interface ILogoutOptions extends ICookieName {
  onLogout?: () => void
  emitLogoutEvent?: boolean
}
