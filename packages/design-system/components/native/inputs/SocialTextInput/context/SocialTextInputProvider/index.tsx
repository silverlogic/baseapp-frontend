import { FC, PropsWithChildren, createContext, useRef } from 'react'

import { StoreApi, create } from 'zustand'

import { INITIAL_SOCIAL_TEXT_INPUT_STATE } from './constants'
import { UseSocialTextInput } from './types'

export const SocialTextInputContext = createContext<StoreApi<UseSocialTextInput> | null>(null)

const SocialTextInputProvider: FC<PropsWithChildren> = ({ children }) => {
  const storeRef = useRef<StoreApi<UseSocialTextInput>>(null)
  if (!storeRef.current) {
    storeRef.current = create<UseSocialTextInput>((set) => ({
      ...INITIAL_SOCIAL_TEXT_INPUT_STATE,
      setSocialInputState: set as UseSocialTextInput['setSocialInputState'],
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
