import { useEffect } from 'react'

import { ACCESS_COOKIE_NAME } from '@baseapp-frontend/utils'
import { JWTContent } from '@baseapp-frontend/utils/types/jwt'

import { useQuery, useQueryClient } from '@tanstack/react-query'
import Cookies from 'js-cookie'

import UserApi, { USER_API_KEY } from '../../../services/user'
import { User } from '../../../types/user'
import getUser from '../getUser'
import { UseJWTUserOptions } from './types'

/**
 * Fetches the user data using the JWT token data as placeholder data.
 *
 * This makes user data available before fetching it from the server.
 *
 * Be aware that, by using `useJWTUser` with `noSSR` set to `false`, will make the Next.js page to opt-out from Static Rendering and be dynamically rendered.
 */
const useJWTUser = <TUser extends Partial<User> & JWTContent>({
  options,
  cookieName = ACCESS_COOKIE_NAME,
  ApiClass = UserApi,
  noSSR = false,
}: UseJWTUserOptions<TUser> = {}) => {
  // TODO: placeholderData generic type is not working as expected, open an issue on react-query github
  type NonFunctionGuard<T> = T extends Function ? never : T
  const token = Cookies.get(cookieName) ?? ''
  const placeholderData = getUser<TUser>({ cookieName, noSSR }) as NonFunctionGuard<TUser>

  const queryClient = useQueryClient()

  const { data: user, ...query } = useQuery({
    queryFn: () => ApiClass.getUser<TUser>(),
    queryKey: USER_API_KEY.getUser(),
    staleTime: Infinity, // makes cache never expire automatically
    enabled: !!token,
    throwOnError: false,
    placeholderData,
    ...options, // needs to be placed bellow all overridable options
  })

  useEffect(() => {
    if ((query.error as any)?.response?.status === 401) {
      // we don't need to remove cookies here since this should be done by the interceptor

      // making sure to reset the cache
      queryClient.resetQueries({ queryKey: USER_API_KEY.getUser() })
    }
  }, [query.error])

  return { user, ...query }
}

export default useJWTUser
