import {
  ACCESS_COOKIE_NAME,
  REFRESH_COOKIE_NAME,
  TokenTypes,
  refreshAccessToken,
} from '@baseapp-frontend/utils'

import { useMutation, useQueryClient } from '@tanstack/react-query'

import UserApi, { USER_API_KEY } from '../../../services/user'
import { IUser, UserUpdateParams } from '../../../types/user'
import { UseUpdateUserOptions } from './types'

const useUpdateUser = <TUser extends Pick<IUser, 'id'>>({
  options,
  cookieName = ACCESS_COOKIE_NAME,
  refreshCookieName = REFRESH_COOKIE_NAME,
  ApiClass = UserApi,
}: UseUpdateUserOptions<TUser> = {}) => {
  const queryClient = useQueryClient()

  const mutation = useMutation(
    (params: UserUpdateParams<TUser>) => ApiClass.updateUser<TUser>(params),
    {
      onSettled: async (data, error, variables, context) => {
        queryClient.invalidateQueries(USER_API_KEY.getUser())
        try {
          const tokenType = process.env.NEXT_PUBLIC_TOKEN_TYPE as TokenTypes
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
    },
  )

  return mutation
}

export default useUpdateUser
