'use client'

import { useEffect } from 'react'

import { useQuery, useQueryClient } from '@tanstack/react-query'

import UserApi, { USER_API_KEY } from '../../../services/user'
import type { User } from '../../../types/user'
import { useSession } from '../useSession'
import type { UseCurrentUserOptions } from './types'

const useCurrentUser = <TUser extends Partial<User>>({
  options,
  ApiClass = UserApi,
}: UseCurrentUserOptions<TUser> = {}) => {
  type NonFunctionGuard<T> = T extends Function ? never : T

  const { user: sessionUser, isAuthenticated } = useSession<TUser>()
  const queryClient = useQueryClient()
  const placeholderData = (sessionUser ?? undefined) as NonFunctionGuard<TUser> | undefined

  const { data: user, ...query } = useQuery({
    queryFn: () => ApiClass.getUser<TUser>(),
    queryKey: USER_API_KEY.getUser(),
    staleTime: Infinity,
    enabled: isAuthenticated,
    throwOnError: false,
    placeholderData,
    ...options,
  })

  useEffect(() => {
    if ((query.error as any)?.response?.status === 401) {
      queryClient.resetQueries({ queryKey: USER_API_KEY.getUser() })
    }
  }, [query.error, queryClient])

  return {
    user: (user ?? sessionUser ?? null) as TUser | null,
    ...query,
  }
}

export default useCurrentUser
