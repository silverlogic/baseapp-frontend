import { ACCESS_COOKIE_NAME, REFRESH_COOKIE_NAME, TokenTypes } from '@baseapp-frontend/utils'

import { useQuery, useQueryClient } from '@tanstack/react-query'
import Cookies from 'js-cookie'

import AuthApi, { PRE_AUTH_API_KEY } from '../../../services/auth'
import { USER_API_KEY } from '../../../services/user'
import { isJWTResponse } from '../../../utils/login'
import { useSimpleTokenUser } from '../../user'
import { IUsePreAuth } from './types'

const usePreAuth = ({
  token,
  queryOptions = {},
  tokenType = TokenTypes.jwt,
  cookieName = ACCESS_COOKIE_NAME,
  refreshCookieName = REFRESH_COOKIE_NAME,
  ApiClass = AuthApi,
}: IUsePreAuth) => {
  const queryClient = useQueryClient()
  const { refetch: refetchUser } = useSimpleTokenUser({ options: { enabled: false } })

  const query = useQuery({
    enabled: !!token,
    useErrorBoundary: false,
    retry: false,
    ...queryOptions, // needs to be placed bellow all overridable options
    queryKey: PRE_AUTH_API_KEY.preAuth(token, tokenType),
    queryFn: () => ApiClass.preAuth({ token }, tokenType),
    onSuccess: (response) => {
      if (isJWTResponse(tokenType, response)) {
        Cookies.set(cookieName, response.access, {
          secure: process.env.NODE_ENV === 'production',
        })
        Cookies.set(refreshCookieName, response.refresh, {
          secure: process.env.NODE_ENV === 'production',
        })
      } else {
        Cookies.set(cookieName, response.token, {
          secure: process.env.NODE_ENV === 'production',
        })
      }
      queryClient.resetQueries(USER_API_KEY.getUser())
      refetchUser()

      queryOptions?.onSuccess?.(response)
    },
    onError: (error: any) => {
      queryOptions?.onError?.(error)
    },
  })

  return {
    query,
  }
}

export default usePreAuth
