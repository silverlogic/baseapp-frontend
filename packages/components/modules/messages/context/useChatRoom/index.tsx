import { useContext } from 'react'

import { useStore } from 'zustand'

import { ChatRoomContext } from '../ChatRoomProvider'

// TODO: add custom selector
const useChatRoom = () => {
  const store = useContext(ChatRoomContext)

  if (!store) {
    throw new Error('Missing CommentReplyProvider')
  }

  return useStore(store, (state) => state)
}

export default useChatRoom
