import {
  ACCESS_KEY_NAME,
  LOGOUT_EVENT,
  REFRESH_KEY_NAME,
  eventEmitter,
  removeTokenAsync,
} from '@baseapp-frontend/utils'
import { CURRENT_PROFILE_KEY_NAME } from '@baseapp-frontend/utils/constants/profile'

import { useQueryClient } from '@tanstack/react-query'

import { MFA_API_KEY } from '../../../services/mfa'
import { USER_API_KEY } from '../../../services/user'
import type { UseLogoutOptions } from './types'

const useLogout = ({
  accessKeyName = ACCESS_KEY_NAME,
  refreshKeyName = REFRESH_KEY_NAME,
  onLogout,
  emitLogoutEvent = true,
}: UseLogoutOptions = {}) => {
  const queryClient = useQueryClient()

  const logout = async () => {
    await removeTokenAsync(accessKeyName)
    await removeTokenAsync(refreshKeyName)
    await removeTokenAsync(CURRENT_PROFILE_KEY_NAME)
    queryClient.resetQueries({ queryKey: USER_API_KEY.getUser() })
    queryClient.resetQueries({ queryKey: MFA_API_KEY.default })
    onLogout?.()
    if (emitLogoutEvent) {
      eventEmitter.emit(LOGOUT_EVENT)
    }
  }

  return {
    logout,
  }
}

export default useLogout
