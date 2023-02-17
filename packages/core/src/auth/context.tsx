import { ReactNode, createContext, useContext, useMemo, useState } from 'react'

import Cookies from 'js-cookie'
import { useQuery } from 'react-query'

import { COOKIE_NAME } from './constants'
import type { IUser, IUserContext } from './types'

export const UserContext = createContext({
  user: null,
  isLoading: true,
  isSuccess: false,
  isIdle: false,
  status: '',
  setUser: (state: any) => state,
  refetchUser: () => {},
} as IUserContext)

export const useUserContext = () => useContext(UserContext)

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<IUser | null>(null)
  const token = Cookies.get(COOKIE_NAME)

  const {
    isLoading,
    isSuccess,
    isIdle,
    status,
    refetch: refetchUser,
  } = useQuery({
    queryKey: '/users/me',
    staleTime: Infinity, // makes cache never expire automatically
    enabled: !!token,
    useErrorBoundary: false,
    onSuccess: (response: any) => {
      setUser(response?.data)
    },
    onError: (error: any) => {
      if (error?.response?.status === 401) {
        // since response is 401 Unauthorized it also prabably has the body:
        // {"detail":"Invalid token."}
        // better remove the cookie
        Cookies.remove(COOKIE_NAME)
      }
      setUser(null)
    },
  })

  const value = useMemo(
    () => ({
      user,
      isLoading,
      isSuccess,
      isIdle,
      status,
      setUser,
      refetchUser,
    }),
    [user, isLoading, isSuccess, isIdle, status, setUser, refetchUser],
  )

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}
