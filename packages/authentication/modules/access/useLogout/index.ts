import { COOKIE_NAME } from '@baseapp-frontend/utils'

import { useQueryClient } from '@tanstack/react-query'
import Cookies from 'js-cookie'

import { MFA_API_KEY } from '../../../services/mfa'
import { USER_API_KEY } from '../../../services/user'
import { ILogoutOptions } from './types'

const useLogout = ({ cookieName = COOKIE_NAME, onLogout }: ILogoutOptions = {}) => {
  const queryClient = useQueryClient()

  const logout = () => {
    Cookies.remove(cookieName)
    queryClient.resetQueries(USER_API_KEY.getUser())
    queryClient.resetQueries(MFA_API_KEY.default)
    onLogout?.()
  }

  return {
    logout,
  }
}

export default useLogout
