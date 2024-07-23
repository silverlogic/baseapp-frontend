import { useContext } from 'react'

import { useStore } from 'zustand'

import { CommentReplyContext } from '../CommentReplyProvider'

// TODO: add custom selector
const useCommentReply = () => {
  const store = useContext(CommentReplyContext)

  if (!store) {
    throw new Error('Missing CommentReplyProvider')
  }

  return useStore(store, (state) => state)
}

export default useCommentReply
