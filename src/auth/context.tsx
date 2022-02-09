import { useState, cloneElement, createContext, useContext, ReactNode } from 'react'
import Cookies from 'js-cookie'
import { COOKIE_NAME } from './constants'
import { axios, useMutation, useQuery, useQueryClient } from '../api'
import type { IUser, IUserContext } from './types'

export const UserContext = createContext({
  user: null,
  isLoading: false,
  isSuccess: false,
  isIdle: false,
  status: '',
  setUser: (state: any) => state
} as IUserContext)

export const useUserContext = () => useContext(UserContext)

export const UserProvider = ({children}: {children: ReactNode}) => {
  const [user, setUser] = useState<IUser | null>(null)
  const token = Cookies.get(COOKIE_NAME)

  const { isLoading, isSuccess, isIdle, status } = useQuery({
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

  return <UserContext.Provider value={{
    user, isLoading, isSuccess, isIdle, status, setUser
  }}>{children}</UserContext.Provider>
}

