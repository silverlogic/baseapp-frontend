'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'

import UserApi, { USER_API_KEY } from '../../../services/user'
import { getSessionService } from '../../../session/client'
import type { User, UserUpdateParams } from '../../../types/user'
import { SESSION_QUERY_KEY } from '../useSession'
import type { UseUpdateUserOptions } from './types'

const useUpdateUser = <TUser extends Pick<User, 'id'>>({
  options,
  ApiClass = UserApi,
}: UseUpdateUserOptions<TUser> = {}) => {
  const queryClient = useQueryClient()
  const sessionService = getSessionService()
  const { onSuccess, onSettled, ...mutationOptions } = options ?? {}

  const mutation = useMutation({
    mutationFn: (params: UserUpdateParams<TUser>) => ApiClass.updateUser<TUser>(params),
    onSuccess: async (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: USER_API_KEY.getUser() })
      queryClient.invalidateQueries({ queryKey: SESSION_QUERY_KEY })

      const session = await Promise.resolve(sessionService.read())

      if (session.refreshToken) {
        await sessionService.refresh()
      }

      await onSuccess?.(data, variables, context)
    },
    onSettled: async (data, error, variables, context) => {
      await onSettled?.(data, error, variables, context)
    },
    ...mutationOptions,
  })

  return mutation
}

export default useUpdateUser
