'use client'

import { FC, PropsWithChildren, createContext, useContext, useRef } from 'react'

import { StoreApi, create, useStore } from 'zustand'

import { ProfileItemFragment$data } from '../../../../../__generated__/ProfileItemFragment.graphql'
import { INITIAL_GROUP_CHAT_STATE } from './constants'
import { GroupChatCreateState, UseGroupChat } from './types'
import { isSameIdList } from './utils'

export const GroupChatContext = createContext<StoreApi<UseGroupChat> | null>(null)

const GroupChatProvider: FC<PropsWithChildren> = ({ children }) => {
  const storeRef = useRef<StoreApi<UseGroupChat> | undefined>(undefined)
  if (!storeRef.current) {
    storeRef.current = create<UseGroupChat>((set) => ({
      ...INITIAL_GROUP_CHAT_STATE,
      setGroupChat: (state: GroupChatCreateState) => set(state),
      setParticipants: (participants: ProfileItemFragment$data[]) => set({ participants }),
      // returning the same state skips zustand's notify: consumers subscribe to the whole
      // store, and these two are re-set from Relay data that gets a fresh identity per read
      setExistingParticipants: (existingParticipants: string[]) =>
        set((state) =>
          isSameIdList(state.existingParticipants, existingParticipants)
            ? state
            : { existingParticipants },
        ),
      setRoomId: (roomId: string) => set((state) => (state.roomId === roomId ? state : { roomId })),
      resetGroupChat: () => set({ ...INITIAL_GROUP_CHAT_STATE }),
    }))
  }
  return <GroupChatContext.Provider value={storeRef.current}>{children}</GroupChatContext.Provider>
}

export const useGroupChatCreate = () => {
  const store = useContext(GroupChatContext)

  if (!store) {
    throw new Error('Missing GroupChatProvider')
  }

  return useStore(store, (state) => state)
}

export default GroupChatProvider
