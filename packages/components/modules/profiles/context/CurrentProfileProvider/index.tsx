'use client'

import { FC, PropsWithChildren, createContext, useEffect, useRef } from 'react'

import { useEnvironment } from '@baseapp-frontend/graphql'

import { Environment, fetchQuery, readInlineData } from 'react-relay'
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

const CurrentProfileProvider: FC<PropsWithChildren> = ({ children }) => {
  const environment = useEnvironment()
  const storeRef = useRef<StoreApi<UseCurrentProfile>>()

  if (!storeRef.current) {
    storeRef.current = create(
      persist<UseCurrentProfile>(
        (set) => ({
          ...INITIAL_CURRENT_PROFILE_STATE,
          setCurrentProfile: set,
        }),
        {
          name: CURRENT_PROFILE_STORAGE_KEY,
        },
      ),
    )
  }

  const isSSR = typeof window === 'undefined'
  const shouldFetchProfile = !isSSR && !storeRef.current.getState().profile

  useEffect(() => {
    if (shouldFetchProfile && environment) {
      fetchUserProfile(environment).then((userProfile) => {
        if (userProfile) {
          storeRef.current?.setState({ profile: userProfile })
        }
      })
    }
  }, [shouldFetchProfile, environment])

  return (
    <CurrentProfileContext.Provider value={storeRef.current}>
      {children}
    </CurrentProfileContext.Provider>
  )
}

export default CurrentProfileProvider
