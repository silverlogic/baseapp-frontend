import { FC, PropsWithChildren, createContext, useRef } from 'react'

import { StoreApi, create } from 'zustand'

import { INITIAL_COMMENT_REPLY_STATE } from './constants'
import { UseCommentReply } from './types'

export const CommentReplyContext = createContext<StoreApi<UseCommentReply> | null>(null)

const CommentReplyProvider: FC<PropsWithChildren> = ({ children }) => {
  const storeRef = useRef<StoreApi<UseCommentReply>>()
  if (!storeRef.current) {
    storeRef.current = create<UseCommentReply>((set) => ({
      ...INITIAL_COMMENT_REPLY_STATE,
      setCommentReply: set,
      resetCommentReply: () => set({ ...INITIAL_COMMENT_REPLY_STATE }),
    }))
  }
  return (
    <CommentReplyContext.Provider value={storeRef.current}>{children}</CommentReplyContext.Provider>
  )
}

export default CommentReplyProvider
