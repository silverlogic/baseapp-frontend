'use client'

import {
  LOGOUT_EVENT,
  SESSION_TOKEN_KEY_NAME,
  eventEmitter,
  getToken,
} from '@baseapp-frontend/utils'

import { useQueryClient } from '@tanstack/react-query'

import AllAuthApi from '../../../../services/allauth'
import { MFA_API_KEY } from '../../../../services/mfa'
import { USER_API_KEY } from '../../../../services/user'
import { useAllAuthSession } from '../useAllAuthSession'
import type { UseAllAuthLogoutOptions } from './types'

const useAllAuthLogout = ({ onLogout, emitLogoutEvent = true }: UseAllAuthLogoutOptions = {}) => {
  const queryClient = useQueryClient()
  const { clearSession } = useAllAuthSession()

  const logout = async () => {
    try {
      const sessionToken = getToken(SESSION_TOKEN_KEY_NAME)
      await AllAuthApi.logout(sessionToken || undefined)
    } catch (error) {
      // Logout API call failed, clearing local state anyway
    }

    await clearSession()

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

export default useAllAuthLogout
