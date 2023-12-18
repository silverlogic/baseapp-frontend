import {
  ACCESS_COOKIE_NAME,
  LOGOUT_EVENT,
  REFRESH_COOKIE_NAME,
  eventEmitter,
} from '@baseapp-frontend/utils'

import { useQueryClient } from '@tanstack/react-query'
import Cookies from 'js-cookie'

import { MFA_API_KEY } from '../../../services/mfa'
import { USER_API_KEY } from '../../../services/user'
import { ILogoutOptions } from './types'

const useLogout = ({
  cookieName = ACCESS_COOKIE_NAME,
  refreshCookieName = REFRESH_COOKIE_NAME,
  onLogout,
  emitLogoutEvent = true,
}: ILogoutOptions = {}) => {
  const queryClient = useQueryClient()

  const logout = () => {
    Cookies.remove(cookieName)
    Cookies.remove(refreshCookieName)
    queryClient.resetQueries(USER_API_KEY.getUser())
    queryClient.resetQueries(MFA_API_KEY.default)
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
