import { useQueryClient } from '@tanstack/react-query'

import { MFA_API_KEY } from '../../../services/mfa'
import { USER_API_KEY } from '../../../services/user'
import { getSessionService } from '../../../session/client'
import { getActiveAuthModule } from '../../auth-strategy/factory'
import type { UseLogoutOptions } from './types'

const useLogout = ({ onLogout, emitLogoutEvent = true }: UseLogoutOptions = {}) => {
  const queryClient = useQueryClient()
  const { strategy } = getActiveAuthModule()

  const logout = async () => {
    try {
      await strategy.logout()
    } catch {
      // Strategy logout failed; clearing local state anyway
    }

    const sessionService = getSessionService()
    await sessionService.clear(emitLogoutEvent ? 'logout' : undefined)
    queryClient.resetQueries({ queryKey: USER_API_KEY.getUser() })
    queryClient.resetQueries({ queryKey: MFA_API_KEY.default })
    onLogout?.()
  }

  return {
    logout,
  }
}

export default useLogout
