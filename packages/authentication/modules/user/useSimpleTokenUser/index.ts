import { useEffect } from 'react'

import { ACCESS_COOKIE_NAME, LANGUAGE_COOKIE_NAME, LanguagesEnum } from '@baseapp-frontend/utils'

import { useQuery, useQueryClient } from '@tanstack/react-query'
import Cookies from 'js-cookie'

import UserApi, { USER_API_KEY } from '../../../services/user'
import { User } from '../../../types/user'
import { UseSimpleTokenUserOptions } from './types'

const useSimpleTokenUser = <TUser extends Partial<User>>({
  options,
  cookieName = ACCESS_COOKIE_NAME,
  languageCookieName = LANGUAGE_COOKIE_NAME,
  ApiClass = UserApi,
}: UseSimpleTokenUserOptions<TUser> = {}) => {
  const token = Cookies.get(cookieName)
  const queryClient = useQueryClient()

  const { data: user, ...query } = useQuery({
    queryFn: () => ApiClass.getUser<TUser>(),
    queryKey: USER_API_KEY.getUser(),
    staleTime: Infinity, // makes cache never expire automatically
    enabled: !!token,
    throwOnError: false,
    ...options, // needs to be placed bellow all overridable options
  })

  useEffect(() => {
    if ((query.error as any)?.response?.status === 401) {
      Cookies.remove(cookieName)

      // making sure to reset the cache
      queryClient.resetQueries({ queryKey: USER_API_KEY.getUser() })
    }
  }, [query.error])

  useEffect(() => {
    if (user?.preferredLanguage && user?.preferredLanguage in LanguagesEnum) {
      Cookies.set(languageCookieName, user?.preferredLanguage)
    }
  }, [user?.preferredLanguage])

  return { user, ...query }
}

export default useSimpleTokenUser
