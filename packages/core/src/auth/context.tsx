import { useState, createContext, useContext, ReactNode } from 'react'
import Cookies from 'js-cookie'

import { COOKIE_NAME } from './constants'
import type { IUser, IUserContext } from './types'
import { useQuery } from '../api'

export const UserContext = createContext({
  user: null,
  isLoading: true,
  isSuccess: false,
  isIdle: false,
  status: '',
  setUser: (state: any) => state,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
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

  return (
    <UserContext.Provider
      value={{
        user,
        isLoading,
        isSuccess,
        isIdle,
        status,
        setUser,
        refetchUser,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}
