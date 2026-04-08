'use client'

import { useEffect } from 'react'

import {
  AUTH_SESSION_CLEARED,
  AUTH_SESSION_REFRESHED,
} from '@baseapp-frontend/utils/constants/events'
import { eventEmitter } from '@baseapp-frontend/utils/functions/events'

import { useQuery, useQueryClient } from '@tanstack/react-query'

import { getSessionService } from '../../../session/client'
import type { User } from '../../../types/user'
import { SESSION_STATUS } from '../../auth-strategy/constants'
import type { SessionState } from '../../auth-strategy/types'

const SESSION_QUERY_KEY = ['session'] as const

export { SESSION_QUERY_KEY }

export function useSession<TUser = User>() {
  const queryClient = useQueryClient()
  const {
    data: state,
    isLoading,
    error,
    ...rest
  } = useQuery<SessionState<TUser>>({
    queryKey: SESSION_QUERY_KEY,
    queryFn: () => getSessionService<TUser>().getState(),
    staleTime: 0,
  })

  const isRefreshing =
    state?.status === SESSION_STATUS.expired && Boolean(state.session.refreshToken)

  useEffect(() => {
    const invalidate = () => {
      queryClient.invalidateQueries({ queryKey: SESSION_QUERY_KEY })
    }
    eventEmitter.on(AUTH_SESSION_CLEARED, invalidate)
    eventEmitter.on(AUTH_SESSION_REFRESHED, invalidate)
    return () => {
      eventEmitter.removeListener(AUTH_SESSION_CLEARED, invalidate)
      eventEmitter.removeListener(AUTH_SESSION_REFRESHED, invalidate)
    }
  }, [queryClient])

  return {
    user: state?.user ?? null,
    isAuthenticated: state?.status === SESSION_STATUS.authenticated,
    isRefreshing,
    isLoading,
    error,
    ...rest,
  }
}
