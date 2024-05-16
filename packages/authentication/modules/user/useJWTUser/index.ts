import { ACCESS_COOKIE_NAME } from '@baseapp-frontend/utils'
import { IJWTContent } from '@baseapp-frontend/utils/types/jwt'

import { useQuery, useQueryClient } from '@tanstack/react-query'
import Cookies from 'js-cookie'

import UserApi, { USER_API_KEY } from '../../../services/user'
import { IUser } from '../../../types/user'
import getUser from '../getUser'
import { IUseJWTUser } from './types'

/**
 * Fetches the user data using the JWT token data as placeholder data.
 *
 * This makes user data available before fetching it from the server.
 *
 * Be aware that, by using `useJWTUser` with `noSSR` set to `false`, will make the Next.js page to opt-out from Static Rendering and be dynamically rendered.
 */
const useJWTUser = <TUser extends Partial<IUser> & IJWTContent>({
  options,
  cookieName = ACCESS_COOKIE_NAME,
  ApiClass = UserApi,
  noSSR = false,
}: IUseJWTUser<TUser> = {}) => {
  const token = Cookies.get(cookieName) ?? ''
  const placeholderData = getUser<TUser>({ cookieName, noSSR })
  const queryClient = useQueryClient()

  const { data: user, ...rest } = useQuery({
    queryFn: () => ApiClass.getUser<TUser>(),
    queryKey: USER_API_KEY.getUser(),
    staleTime: Infinity, // makes cache never expire automatically
    enabled: !!token,
    useErrorBoundary: false,
    placeholderData,
    ...options, // needs to be placed bellow all overridable options
    // @ts-ignore TODO: not sure what went wrong here, but this onError shall be removed when we update react query
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
