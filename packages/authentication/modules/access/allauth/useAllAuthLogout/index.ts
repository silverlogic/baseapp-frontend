'use client'

import { LOGOUT_EVENT, eventEmitter } from '@baseapp-frontend/utils'

import { useQueryClient } from '@tanstack/react-query'

import AllAuthApi from '../../../../services/allauth'
import { MFA_API_KEY } from '../../../../services/mfa'
import { USER_API_KEY } from '../../../../services/user'
import { useAllAuthSession } from '../useAllAuthSession'
import type { UseAllAuthLogoutOptions } from './types'

const useAllAuthLogout = ({
  onLogout,
  emitLogoutEvent = true,
}: UseAllAuthLogoutOptions = {}) => {
  const queryClient = useQueryClient()
  const { clearSession } = useAllAuthSession()

  const logout = async () => {
    try {
      await AllAuthApi.logout()
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
