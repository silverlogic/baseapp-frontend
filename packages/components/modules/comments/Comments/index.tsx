import { FC, useEffect, useRef } from 'react'

import { useFragment } from 'react-relay'

import DefaultCommentCreate from '../CommentCreate'
import DefaultCommentsList from '../CommentsList'
import { useCommentReply, withCommentReplyProvider } from '../context'
import { CommentsFragmentQuery } from '../graphql/queries/Comments'
import { CommentsProps } from './types'

const Comments: FC<CommentsProps> = ({
  target: targetRef,
  subscriptionsEnabled = true,
  CommentsList = DefaultCommentsList,
  CommentsListProps,
  CommentCreate = DefaultCommentCreate,
  CommentCreateProps,
  onCommentCreateFocus,
}) => {
  const { resetCommentReply } = useCommentReply()
  const commentCreateRef = useRef<HTMLInputElement>(null)
  const target = useFragment(CommentsFragmentQuery, targetRef)
  const subscriptionsEnabledBoolean =
    typeof subscriptionsEnabled === 'boolean' ? subscriptionsEnabled : true

  const handleCommentCreateFocus = () => {
    if (commentCreateRef.current) {
      commentCreateRef.current.focus({
        preventScroll: true,
      })
      onCommentCreateFocus?.(commentCreateRef.current)
    }
  }

  useEffect(
    () => () => {
      resetCommentReply()
    },
    [],
  )

  if (!target.isCommentsEnabled) {
    return null
  }

  return (
    <div className="grid">
      <CommentsList
        target={target}
        subscriptionsEnabled={subscriptionsEnabledBoolean}
        onReplyClick={handleCommentCreateFocus}
        {...CommentsListProps}
      />
      <CommentCreate ref={commentCreateRef} targetObjectId={target.id} {...CommentCreateProps} />
    </div>
  )
}

export default withCommentReplyProvider(Comments)
