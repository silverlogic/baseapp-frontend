'use client'

import { useEffect } from 'react'

import { ACCESS_KEY_NAME, getToken } from '@baseapp-frontend/utils'
import type { JWTContent } from '@baseapp-frontend/utils/types/jwt'

import { useQuery, useQueryClient } from '@tanstack/react-query'

import UserApi, { USER_API_KEY } from '../../../services/user'
import type { User } from '../../../types/user'
import getUser from '../getUser'
import type { UseJWTUserOptions } from './types'

/**
 * Fetches the user data using the JWT token data as placeholder data.
 *
 * This makes user data available before fetching it from the server.
 *
 * Be aware that, by using `useJWTUser` with `noSSR` set to `false`, will make the Next.js page to opt-out from Static Rendering and be dynamically rendered.
 */
const useJWTUser = <TUser extends Partial<User> & JWTContent>({
  options,
  accessKeyName = ACCESS_KEY_NAME,
  ApiClass = UserApi,
  noSSR = false,
}: UseJWTUserOptions<TUser> = {}) => {
  // TODO: placeholderData generic type is not working as expected, open an issue on react-query github
  type NonFunctionGuard<T> = T extends Function ? never : T
  const token = getToken(accessKeyName, { noSSR }) ?? ''
  const placeholderData = getUser<TUser>({ accessKeyName, noSSR }) as NonFunctionGuard<TUser>

  const queryClient = useQueryClient()

  const { data: user, ...query } = useQuery({
    queryFn: () => ApiClass.getUser<TUser>(),
    queryKey: USER_API_KEY.getUser(),
    staleTime: Infinity, // makes cache never expire automatically
    enabled: !!token,
    throwOnError: false,
    placeholderData,
    ...options, // needs to be placed below all overridable options
  })

  useEffect(() => {
    if ((query.error as any)?.response?.status === 401) {
      queryClient.resetQueries({ queryKey: USER_API_KEY.getUser() })
    }
  }, [query.error])

  return { user, ...query }
}

export default useJWTUser
