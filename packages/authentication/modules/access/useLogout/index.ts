import { COOKIE_NAME } from '@baseapp-frontend/utils'

import { useQueryClient } from '@tanstack/react-query'
import Cookies from 'js-cookie'

import { MFA_API_KEY } from '../../../services/mfa'
import { USER_API_KEY } from '../../../services/user'
import { IUseLogout } from './types'

const useLogout = ({ cookieName = COOKIE_NAME }: IUseLogout) => {
  const queryClient = useQueryClient()

  return () => {
    Cookies.remove(cookieName)
    queryClient.invalidateQueries(USER_API_KEY.getUser())
    queryClient.invalidateQueries(MFA_API_KEY.default)
  }
}

export default useLogout
