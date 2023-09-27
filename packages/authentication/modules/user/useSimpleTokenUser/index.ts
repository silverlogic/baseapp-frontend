import { ACCESS_COOKIE_NAME } from '@baseapp-frontend/utils'

import { useQuery, useQueryClient } from '@tanstack/react-query'
import Cookies from 'js-cookie'

import UserApi, { USER_API_KEY } from '../../../services/user'
import { IUser } from '../../../types/user'
import { IUseSimpleTokenUser } from './types'

const useSimpleTokenUser = <TUser extends Partial<IUser>>({
  options,
  cookieName = ACCESS_COOKIE_NAME,
  ApiClass = UserApi,
}: IUseSimpleTokenUser<TUser> = {}) => {
  const token = Cookies.get(cookieName)
  const queryClient = useQueryClient()

  const { data: user, ...rest } = useQuery({
    queryFn: () => ApiClass.getUser<TUser>(),
    queryKey: USER_API_KEY.getUser(),
    staleTime: Infinity, // makes cache never expire automatically
    enabled: !!token,
    useErrorBoundary: false,
    ...options, // needs to be placed bellow all overridable options
    onError: (error: any) => {
      if (error?.response?.status === 401) {
        // since response is 401 Unauthorized it also probably has the body:
        // {"detail":"Invalid token."}
        // is better to remove the cookie
        Cookies.remove(cookieName)
        // making sure to reset the cache
        queryClient.resetQueries(USER_API_KEY.getUser())
      }
      options?.onError?.(error)
    },
  })

  return { user, ...rest }
}

export default useSimpleTokenUser
