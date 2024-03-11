import { ACCESS_COOKIE_NAME, decodeJWT } from '@baseapp-frontend/utils'

import { useQuery, useQueryClient } from '@tanstack/react-query'
import Cookies from 'js-cookie'

import UserApi, { USER_API_KEY } from '../../../services/user'
import { IUser } from '../../../types/user'
import { IUseJWTUser } from './types'

/**
 * Fetches the user data using the JWT token data as placeholder data.
 *
 * This makes user data available before fetching it from the server.
 */
const useJWTUser = <TUser extends Partial<IUser>>({
  options,
  cookieName = ACCESS_COOKIE_NAME,
  ApiClass = UserApi,
}: IUseJWTUser<TUser> = {}) => {
  const token = Cookies.get(cookieName) || ''
  const placeholderData = decodeJWT<TUser>(token) || undefined
  const queryClient = useQueryClient()

  const { data: user, ...rest } = useQuery({
    queryFn: () => ApiClass.getUser<TUser>(),
    queryKey: USER_API_KEY.getUser(),
    staleTime: Infinity, // makes cache never expire automatically
    enabled: !!token,
    useErrorBoundary: false,
    placeholderData,
    ...options, // needs to be placed bellow all overridable options
    onError: (error: any) => {
      if (error?.response?.status === 401) {
        // we don't need to remove cookies here since this should be done by the interceptor

        // making sure to reset the cache
        queryClient.resetQueries(USER_API_KEY.getUser())
      }
      options?.onError?.(error)
    },
  })

  return { user, ...rest }
}

export default useJWTUser
