import { FC, useEffect, useRef } from 'react'

import { useFragment } from 'react-relay'

import { CommentsFragmentQuery, useCommentReply } from '../../common'
import DefaultCommentCreate from '../CommentCreate'
import DefaultCommentsList from '../CommentsList'
import { BaseCommentsProps } from './types'

/**
 * BaseComments renders the comments component without the `CommentReplyProvider`.
 *
 * Use this instead of `Comments` when you need access to `useCommentReply`
 * in a parent component (e.g., to programmatically control comment replies
 * from your project). In that case, wrap your parent component with
 * `withCommentReplyProvider` to ensure the context is available.
 *
 * If you don't need `useCommentReply` outside of this component, use
 * `Comments` directly — it already includes the provider.
 *
 * @example
 * // In your project, when you need useCommentReply in a parent:
 * const MyCommentsPage: FC = () => {
 *   const { setCommentReply } = useCommentReply()
 *   return <BaseComments target={targetRef} />
 * }
 * export default withCommentReplyProvider(MyCommentsPage)
 */

const BaseComments: FC<BaseCommentsProps> = ({
  target: targetRef,
  subscriptionsEnabled = true,
  CommentsList = DefaultCommentsList,
  CommentsListProps,
  CommentCreate = DefaultCommentCreate,
  CommentCreateProps,
  onCommentCreateFocus,
  commentCreateRef: commentCreateRefProp,
}) => {
  const { resetCommentReply } = useCommentReply()
  const internalCommentCreateRef = useRef<HTMLInputElement>(null)
  const commentCreateRef = commentCreateRefProp ?? internalCommentCreateRef
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

export default BaseComments
