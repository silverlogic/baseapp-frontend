'use client'

import { FC, PropsWithChildren, createContext, useRef } from 'react'

import { StoreApi, create } from 'zustand'

import { INITIAL_COMMENT_COMPOSER_STATE, INITIAL_COMMENT_REPLY_STATE } from './constants'
import { CommentEditTarget, CommentReplyState, UseCommentReply } from './types'

export const CommentReplyContext = createContext<StoreApi<UseCommentReply> | undefined>(undefined)

const CommentReplyProvider: FC<PropsWithChildren> = ({ children }) => {
  const storeRef = useRef<StoreApi<UseCommentReply> | undefined>(undefined)
  if (!storeRef.current) {
    storeRef.current = create<UseCommentReply>((set) => ({
      ...INITIAL_COMMENT_COMPOSER_STATE,
      // Reply and edit modes are mutually exclusive: activating one clears the other.
      setCommentReply: (state: CommentReplyState) => set({ ...state, editingComment: undefined }),
      resetCommentReply: () => set({ ...INITIAL_COMMENT_REPLY_STATE }),
      setCommentEdit: (target: CommentEditTarget) =>
        set({ ...INITIAL_COMMENT_REPLY_STATE, editingComment: target }),
      resetCommentEdit: () => set({ editingComment: undefined }),
      setCommentIdToExpand: (id: string | null) => set({ commentIdToExpand: id }),
    }))
  }
  return (
    <CommentReplyContext.Provider value={storeRef.current}>{children}</CommentReplyContext.Provider>
  )
}

export default CommentReplyProvider
