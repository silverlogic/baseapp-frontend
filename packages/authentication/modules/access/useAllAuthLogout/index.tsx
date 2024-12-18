'use client'

import {
  ACCESS_KEY_NAME,
  LOGOUT_EVENT,
  REFRESH_KEY_NAME,
  eventEmitter,
  removeTokenAsync,
} from '@baseapp-frontend/utils'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import get from 'lodash/get'

import AllAuthApi from '../../../services/allAuth'
import { USER_API_KEY } from '../../../services/user'
import type { UseAllAuthLogout } from './types'

const useAllAuthLogout = ({
  accessKeyName = ACCESS_KEY_NAME,
  refreshKeyName = REFRESH_KEY_NAME,
  onSuccess,
  emitLogoutEvent = true,
}: UseAllAuthLogout = {}) => {
  const queryClient = useQueryClient()

  const clearData = async () => {
    await removeTokenAsync(accessKeyName)
    await removeTokenAsync(refreshKeyName)
    // eslint-disable-next-line no-underscore-dangle
    AllAuthApi._clearData()
  }

  const mutation = useMutation({
    mutationFn: () => AllAuthApi.logout(),
    onError: async (error: any) => {
      // 401: SessionInfo with SessionResponseNotAuthenticated (to reauthenticate)
      const response = get(error, 'response')
      if ([401, 410].includes(response.status)) {
        clearData()
        queryClient.resetQueries({ queryKey: USER_API_KEY.getUser() })
        onSuccess?.()
        if (emitLogoutEvent) {
          eventEmitter.emit(LOGOUT_EVENT)
        }
      }
    },
  })

  return {
    clearData,
    logout: () => mutation.mutateAsync(),
  }
}

export default useAllAuthLogout