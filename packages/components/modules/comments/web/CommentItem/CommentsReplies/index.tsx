import { FC, useMemo, useTransition } from 'react'

import { Box } from '@mui/material'
import { useIntl } from 'react-intl'
import { Virtuoso } from 'react-virtuoso'

import {
  CommentsSubscription,
  NUMBER_OF_COMMENTS_TO_LOAD_NEXT,
  useCommentList,
} from '../../../common'
import { LoadMoreRepliesButton } from './styled'
import { CommentsRepliesProps } from './types'

const CommentsReplies: FC<CommentsRepliesProps> = ({
  target: targetRef,
  currentThreadDepth,
  subscriptionsEnabled,
  onReplyClick,
  CommentItem,
  VirtuosoProps,
}) => {
  const intl = useIntl()
  const { data: target, loadNext, isLoadingNext, hasNext } = useCommentList(targetRef)
  const [isPending, startTransition] = useTransition()

  const comments = useMemo(
    () => target?.comments?.edges.filter((edge) => edge?.node).map((edge) => edge?.node) || [],
    [target?.comments?.edges],
  )

  const renderCommentItem = (comment: any) => {
    if (!comment) return null

    return (
      <CommentItem
        target={target}
        key={`comment-reply-${comment.id}`}
        comment={comment}
        currentThreadDepth={currentThreadDepth}
        subscriptionsEnabled={subscriptionsEnabled}
        onReplyClick={onReplyClick}
      />
    )
  }

  const renderHeader = () => {
    if (comments.length === 0) return null

    return <div className="h-2" />
  }

  const renderLoadingMoreButton = () => {
    if (!hasNext) return null

    const commentsLeft = Number(target?.commentsCount?.total) - comments.length

    return (
      <Box sx={{ paddingTop: 1 }}>
        <LoadMoreRepliesButton
          variant="text"
          size="small"
          disableElevation
          disableRipple
          disabled={isPending || isLoadingNext}
          onClick={() => {
            startTransition(() => {
              loadNext(NUMBER_OF_COMMENTS_TO_LOAD_NEXT)
            })
          }}
        >
          {intl.formatMessage(
            {
              id: 'comments.replies.showMore',
              defaultMessage: 'Show more replies ({count})',
            },
            { count: commentsLeft },
          )}
        </LoadMoreRepliesButton>
      </Box>
    )
  }

  return (
    <>
      {subscriptionsEnabled && <CommentsSubscription targetObjectId={target.id} />}
      <Virtuoso
        useWindowScroll
        data={comments}
        // TODO: using overscan can cause Maximum call stack size exceeded error
        // overscan={NUMBER_OF_COMMENTS_TO_LOAD_NEXT}
        itemContent={(_index, comment) => renderCommentItem(comment)}
        components={{
          Header: renderHeader,
          Footer: renderLoadingMoreButton,
        }}
        {...VirtuosoProps}
      />
    </>
  )
}

export default CommentsReplies
