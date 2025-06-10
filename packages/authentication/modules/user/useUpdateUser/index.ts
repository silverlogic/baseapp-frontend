'use client'

import { ACCESS_KEY_NAME, REFRESH_KEY_NAME, refreshAccessToken } from '@baseapp-frontend/utils'
import { getToken } from '@baseapp-frontend/utils/functions/token'

import { useMutation, useQueryClient } from '@tanstack/react-query'

import UserApi, { USER_API_KEY } from '../../../services/user'
import type { User, UserUpdateParams } from '../../../types/user'
import { useCurrentProfile } from '../../profile'
import type { UseUpdateUserOptions } from './types'

const useUpdateUser = <TUser extends Pick<User, 'id'>>({
  options,
  accessKeyName = ACCESS_KEY_NAME,
  refreshKeyName = REFRESH_KEY_NAME,
  ApiClass = UserApi,
}: UseUpdateUserOptions<TUser> = {}) => {
  const queryClient = useQueryClient()
  const { setCurrentProfile } = useCurrentProfile()
  const refreshToken = getToken(refreshKeyName)

  const mutation = useMutation({
    mutationFn: (params: UserUpdateParams<TUser>) => ApiClass.updateUser<TUser>(params),
    onSettled: async (data, error, variables, context) => {
      queryClient.invalidateQueries({ queryKey: USER_API_KEY.getUser() })
      try {
        await refreshAccessToken({ refreshToken, accessKeyName, refreshKeyName })
      } catch (e) {
        // silently fail
        // eslint-disable-next-line no-console
        setCurrentProfile(null)
      }
      options?.onSettled?.(data, error, variables, context)
    },
    ...options,
  })

  return mutation
}

export default useUpdateUser
