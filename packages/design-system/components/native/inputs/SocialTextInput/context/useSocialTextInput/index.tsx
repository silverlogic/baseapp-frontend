import { useContext } from 'react'

import { useStore } from 'zustand'

import { SocialTextInputContext } from '../SocialTextInputProvider'

const useSocialTextInput = () => {
  const store = useContext(SocialTextInputContext)

  if (!store) {
    throw new Error('Missing SocialTextInputProvider')
  }

  return useStore(store, (state) => state)
}

export default useSocialTextInput
