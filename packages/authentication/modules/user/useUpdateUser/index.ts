import { ACCESS_KEY_NAME, REFRESH_KEY_NAME, refreshAccessToken } from '@baseapp-frontend/utils'

import { useMutation, useQueryClient } from '@tanstack/react-query'

import UserApi, { USER_API_KEY } from '../../../services/user'
import type { User, UserUpdateParams } from '../../../types/user'
import type { UseUpdateUserOptions } from './types'

const useUpdateUser = <TUser extends Pick<User, 'id'>>({
  options,
  accessKeyName = ACCESS_KEY_NAME,
  refreshKeyName = REFRESH_KEY_NAME,
  ApiClass = UserApi,
}: UseUpdateUserOptions<TUser> = {}) => {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: (params: UserUpdateParams<TUser>) => ApiClass.updateUser<TUser>(params),
    onSettled: async (data, error, variables, context) => {
      queryClient.invalidateQueries({ queryKey: USER_API_KEY.getUser() })
      try {
        await refreshAccessToken(accessKeyName, refreshKeyName)
      } catch (e) {
        // silently fail
        // eslint-disable-next-line no-console
        console.error(e)
      }
      options?.onSettled?.(data, error, variables, context)
    },
    ...options,
  })

  return mutation
}

export default useUpdateUser
