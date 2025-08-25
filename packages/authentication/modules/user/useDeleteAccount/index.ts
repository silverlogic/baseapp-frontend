'use client'

import { useNotification } from '@baseapp-frontend/utils'

import { useMutation } from '@tanstack/react-query'

import AuthApi from '../../../services/auth'
import useLogout from '../../access/useLogout'
import type { UseDeleteAccountOptions } from './types'

const useDeleteAccount = (options: UseDeleteAccountOptions = {}) => {
  const { sendToast, sendApiErrorToast } = useNotification()

  const { logout } = useLogout()

  return useMutation({
    mutationFn: async () => AuthApi.deleteAccount(),
    ...options,
    onSuccess: (data, variables, context) => {
      sendToast(`Account deleted successfully`)
      logout()
      options.onSuccess?.(data, variables, context)
    },
    onError: (error, variables, context) => {
      options.onError?.(error, variables, context)
      sendApiErrorToast('There was an error deleting your account')
    },
  })
}

export default useDeleteAccount
