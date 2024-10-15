'use client'

import { FC, PropsWithChildren, createContext, useEffect, useRef } from 'react'

import { User, useJWTUser } from '@baseapp-frontend/authentication'
import { JWTContent, LOGOUT_EVENT, eventEmitter } from '@baseapp-frontend/utils'

import { Environment, fetchQuery, readInlineData, useRelayEnvironment } from 'react-relay'
import { StoreApi, create } from 'zustand'
import { persist } from 'zustand/middleware'

import { ProfileItemFragment$key } from '../../../../__generated__/ProfileItemFragment.graphql'
import { UserProfileQuery as UserProfileQueryType } from '../../../../__generated__/UserProfileQuery.graphql'
import { ProfileItemFragment } from '../../graphql/queries/ProfileItem'
import { UserProfileQuery } from '../../graphql/queries/UserProfile'
import { CURRENT_PROFILE_STORAGE_KEY, INITIAL_CURRENT_PROFILE_STATE } from './constants'
import { UseCurrentProfile } from './types'

export const CurrentProfileContext = createContext<StoreApi<UseCurrentProfile> | null>(null)

const fetchUserProfile = async (environment: Environment) => {
  const data = await fetchQuery<UserProfileQueryType>(
    environment,
    UserProfileQuery,
    {},
    { fetchPolicy: 'store-or-network' },
  ).toPromise()

  const userProfile = data?.me?.profile
    ? readInlineData<ProfileItemFragment$key>(ProfileItemFragment, data.me.profile)
    : null

  return userProfile
}

const validateStoredState = (currentUserId: number, store: StoreApi<UseCurrentProfile>) => {
  if (store.getState().userId !== currentUserId) {
    store.setState({ ...INITIAL_CURRENT_PROFILE_STATE, userId: currentUserId })
  }
}

const CurrentProfileProvider: FC<PropsWithChildren> = ({ children }) => {
  const { user } = useJWTUser<User & JWTContent>()
  const environment = useRelayEnvironment()
  const storeRef = useRef<StoreApi<UseCurrentProfile>>()

  if (user?.id && !storeRef.current) {
    storeRef.current = create(
      persist<UseCurrentProfile>(
        (set) => ({
          ...INITIAL_CURRENT_PROFILE_STATE,
          userId: user.id,
          setCurrentProfile: set,
        }),
        {
          name: CURRENT_PROFILE_STORAGE_KEY,
        },
      ),
    )
    validateStoredState(user.id, storeRef.current)
  }

  const shouldFetchProfile = storeRef.current && !storeRef.current.getState().profile

  const logoutListener = () => {
    storeRef.current?.setState({ ...INITIAL_CURRENT_PROFILE_STATE })
  }

  useEffect(() => {
    if (shouldFetchProfile && environment) {
      fetchUserProfile(environment)
        .then((userProfile) => {
          if (userProfile) {
            storeRef.current?.setState({ profile: userProfile })
          }
        })
        // If the user profile request fails, the current profile state will remain empty.
        .catch(() => {})
    }
  }, [shouldFetchProfile, environment])

  useEffect(() => {
    eventEmitter.on(LOGOUT_EVENT, logoutListener)
    return () => {
      eventEmitter.removeListener(LOGOUT_EVENT, logoutListener)
    }
  }, [])

  return (
    <CurrentProfileContext.Provider value={storeRef.current ?? null}>
      {children}
    </CurrentProfileContext.Provider>
  )
}

export default CurrentProfileProvider