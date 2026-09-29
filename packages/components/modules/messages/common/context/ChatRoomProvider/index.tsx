'use client'

import { FC, PropsWithChildren, createContext, useRef } from 'react'

import { StoreApi, create } from 'zustand'

import { SocialUpsertForm } from '../../../../__shared__/common'
import { INITIAL_CHAT_ROOM_STATE } from './constants'
import { ChatRoomState, LeftPanelContentValues, UseChatRoom } from './types'

export const ChatRoomContext = createContext<StoreApi<UseChatRoom> | null>(null)

const ChatRoomProvider: FC<PropsWithChildren> = ({ children }) => {
  const storeRef = useRef<StoreApi<UseChatRoom> | undefined>(undefined)
  if (!storeRef.current) {
    storeRef.current = create<UseChatRoom>((set) => ({
      ...INITIAL_CHAT_ROOM_STATE,
      drafts: {},

      setChatRoom: (state: ChatRoomState) => set(state),
      resetChatRoom: () => set({ ...INITIAL_CHAT_ROOM_STATE }),
      setLeftPanelContent: (content: LeftPanelContentValues) => set({ leftPanelContent: content }),
      setDraft: (roomId: string, draft: SocialUpsertForm) =>
        set((state) => ({ drafts: { ...state.drafts, [roomId]: draft } })),
      clearDraft: (roomId: string) =>
        set((state) => {
          const drafts = { ...state.drafts }
          delete drafts[roomId]
          return { drafts }
        }),
    }))
  }
  return <ChatRoomContext.Provider value={storeRef.current}>{children}</ChatRoomContext.Provider>
}

export default ChatRoomProvider
