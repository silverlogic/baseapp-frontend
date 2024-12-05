'use client'

import { useContext } from 'react'

import { useStore } from 'zustand'

import { CurrentProfileContext } from '../CurrentProfileProvider'

const useCurrentProfile = () => {
  const store = useContext(CurrentProfileContext)

  if (!store) {
    throw new Error('Missing CurrentProfileProvider')
  }

  return useStore(store, (state) => state)
}

export default useCurrentProfile
