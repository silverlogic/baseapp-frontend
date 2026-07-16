'use client'

import { useContext } from 'react'

import { useStore } from 'zustand'

import { CommentReplyContext } from '../CommentReplyProvider'
import { UseCommentReply } from '../CommentReplyProvider/types'

// TODO: add custom selector
const useCommentReply = <TElement = unknown,>(): UseCommentReply<TElement> => {
  const store = useContext(CommentReplyContext)

  if (!store) {
    throw new Error('Missing CommentReplyProvider')
  }

  // The store is created with the default (unknown) element type; the generic only refines
  // what the caller reads from / writes into `commentItemRef`.
  return useStore(store, (state) => state) as UseCommentReply<TElement>
}

export default useCommentReply
