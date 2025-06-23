'use client'

import { FC, PropsWithChildren, createContext, useRef } from 'react'

import { StoreApi, create } from 'zustand'

import { INITIAL_SOCIAL_TEXT_INPUT_STATE } from './constants'
import { SocialTextInputState, UseSocialTextInput } from './types'

export const SocialTextInputContext = createContext<StoreApi<UseSocialTextInput> | undefined>(
  undefined,
)

const SocialTextInputProvider: FC<PropsWithChildren> = ({ children }) => {
  const storeRef = useRef<StoreApi<UseSocialTextInput> | undefined>(undefined)
  if (!storeRef.current) {
    storeRef.current = create<UseSocialTextInput>((set) => ({
      ...INITIAL_SOCIAL_TEXT_INPUT_STATE,
      setSocialInputState: (state: SocialTextInputState) => set(state),
      reset: () => set({ ...INITIAL_SOCIAL_TEXT_INPUT_STATE }),
    }))
  }
  return (
    <SocialTextInputContext.Provider value={storeRef.current}>
      {children}
    </SocialTextInputContext.Provider>
  )
}

export default SocialTextInputProvider
