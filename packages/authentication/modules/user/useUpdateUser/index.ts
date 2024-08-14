import {
  ACCESS_COOKIE_NAME,
  REFRESH_COOKIE_NAME,
  TokenTypes,
  refreshAccessToken,
  templateEnv,
} from '@baseapp-frontend/utils'

import { useMutation, useQueryClient } from '@tanstack/react-query'

import UserApi, { USER_API_KEY } from '../../../services/user'
import { User, UserUpdateParams } from '../../../types/user'
import { UseUpdateUserOptions } from './types'

const useUpdateUser = <TUser extends Pick<User, 'id'>>({
  options,
  cookieName = ACCESS_COOKIE_NAME,
  refreshCookieName = REFRESH_COOKIE_NAME,
  ApiClass = UserApi,
}: UseUpdateUserOptions<TUser> = {}) => {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: (params: UserUpdateParams<TUser>) => ApiClass.updateUser<TUser>(params),
    onSettled: async (data, error, variables, context) => {
      queryClient.invalidateQueries({ queryKey: USER_API_KEY.getUser() })
      try {
        const tokenType = templateEnv.NEXT_PUBLIC_TOKEN_TYPE as TokenTypes
        if (tokenType === TokenTypes.jwt) {
          await refreshAccessToken(cookieName, refreshCookieName)
        }
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
