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
 * Fetches the most recent user data from the server with JWT token data as instant placeholder.
 *
 * The key advantage of using this hook is automatic cache invalidation when user
 * data is mutated, ensuring UI stays in sync with server state.
 *
 * Use this when you need fresh user data and automatic updates after user mutations.
 */
const useJWTUser = <TUser extends Partial<User> & JWTContent>({
  options,
  accessKeyName = ACCESS_KEY_NAME,
  ApiClass = UserApi,
}: UseJWTUserOptions<TUser> = {}) => {
  // TODO: placeholderData generic type is not working as expected, open an issue on react-query github
  type NonFunctionGuard<T> = T extends Function ? never : T
  const token = getToken(accessKeyName) ?? ''
  const placeholderData = getUser<TUser>({ accessKeyName }) as NonFunctionGuard<TUser>

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
      queryClient.resetQueries({ queryKey: USER_API_KEY.getUser() })
    }
  }, [query.error])

  return { user, ...query }
}

export default useJWTUser
