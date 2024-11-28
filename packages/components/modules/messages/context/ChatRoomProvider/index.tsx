'use client'

import { FC, PropsWithChildren, createContext, useRef } from 'react'

import { StoreApi, create } from 'zustand'

import { INITIAL_CHAT_ROOM_STATE } from './constants'
import { UseChatRoom } from './types'

export const ChatRoomContext = createContext<StoreApi<UseChatRoom> | null>(null)

const ChatRoomProvider: FC<PropsWithChildren> = ({ children }) => {
  const storeRef = useRef<StoreApi<UseChatRoom>>()
  if (!storeRef.current) {
    storeRef.current = create<UseChatRoom>((set) => ({
      ...INITIAL_CHAT_ROOM_STATE,
      setChatRoom: set,
      resetChatRoom: () => set({ ...INITIAL_CHAT_ROOM_STATE }),
    }))
  }
  return <ChatRoomContext.Provider value={storeRef.current}>{children}</ChatRoomContext.Provider>
}

export default ChatRoomProvider
