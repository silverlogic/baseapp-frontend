'use client'

import { FC, PropsWithChildren, createContext, useRef } from 'react'

import { StoreApi, create } from 'zustand'

import { INITIAL_COMMENT_REPLY_STATE } from './constants'
import { CommentReplyState, UseCommentReply } from './types'

export const CommentReplyContext = createContext<StoreApi<UseCommentReply> | undefined>(undefined)

const CommentReplyProvider: FC<PropsWithChildren> = ({ children }) => {
  const storeRef = useRef<StoreApi<UseCommentReply> | undefined>(undefined)
  if (!storeRef.current) {
    storeRef.current = create<UseCommentReply>((set) => ({
      ...INITIAL_COMMENT_REPLY_STATE,
      setCommentReply: (state: CommentReplyState) => set(state),
      resetCommentReply: () => set({ ...INITIAL_COMMENT_REPLY_STATE }),
    }))
  }
  return (
    <CommentReplyContext.Provider value={storeRef.current}>{children}</CommentReplyContext.Provider>
  )
}

export default CommentReplyProvider
