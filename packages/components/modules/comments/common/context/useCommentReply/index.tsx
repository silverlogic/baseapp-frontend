'use client'

import { useContext } from 'react'

import { useStore } from 'zustand'

import { CommentReplyContext } from '../CommentReplyProvider'
import { UseCommentReply } from '../CommentReplyProvider/types'

/**
 * Read the comment reply store. Pass a `selector` to subscribe to a slice only — with the
 * default whole-state read, ANY store write re-renders the consumer, which is fine for
 * one-per-thread components (composer, provider) but not for per-item consumers (wrap
 * multi-field selectors in zustand's `useShallow`).
 */
const useCommentReply = <TElement = unknown, TSelected = UseCommentReply<TElement>>(
  selector?: (state: UseCommentReply<TElement>) => TSelected,
): TSelected => {
  const store = useContext(CommentReplyContext)

  if (!store) {
    throw new Error('Missing CommentReplyProvider')
  }

  // The store is created with the default (unknown) element type; the generic only refines
  // what the caller reads from / writes into `commentItemRef`.
  return useStore(
    store,
    (selector ?? ((state) => state as TSelected)) as (state: UseCommentReply) => TSelected,
  )
}

export default useCommentReply
