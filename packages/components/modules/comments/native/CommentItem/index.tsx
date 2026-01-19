import { FC } from 'react'

import { AvatarWithPlaceholder } from '@baseapp-frontend/design-system/components/native/avatars'
import { Text } from '@baseapp-frontend/design-system/components/native/typographies'
import { View } from '@baseapp-frontend/design-system/components/native/views'

import { Pressable } from 'react-native'
import { useRefetchableFragment } from 'react-relay'

import { CommentItemRefetchQuery } from '../../../../__generated__/CommentItemRefetchQuery.graphql'
import { CommentItem_comment$key } from '../../../../__generated__/CommentItem_comment.graphql'
import { Timestamp as DefaultTimestamp } from '../../../__shared__/native'
import { CommentItemFragmentQuery } from '../../common'
import DefaultCommentReactionButton from './CommentReactionButton'
import DefaultCommentReplyButton from './CommentReplyButton'
import { createStyles } from './styles'
import { CommentItemProps } from './types'

const CommentItem: FC<CommentItemProps> = ({
  comment: commentRef,
  onLongPress,
  Timestamp = DefaultTimestamp,
  CommentReplyButton = DefaultCommentReplyButton,
  CommentReactionButton = DefaultCommentReactionButton,
}) => {
  const [comment] = useRefetchableFragment<CommentItemRefetchQuery, CommentItem_comment$key>(
    CommentItemFragmentQuery,
    commentRef,
  )

  const styles = createStyles()

  const replyToComment = () => {
    // TODO (in another story)
    console.log('Reply button clicked')
  }

  if (!comment) {
    return null
  }

  return (
    <Pressable onLongPress={() => onLongPress?.(comment)}>
      <View style={styles.rootContainer}>
        <View style={styles.avatarContainer}>
          <AvatarWithPlaceholder imgSource={comment.user?.avatar?.url} />
        </View>
        <View style={styles.bodyContainer}>
          <Text variant="subtitle2" color="high">
            {comment.user?.fullName}
          </Text>
          <Text variant="body2" color="high">
            {comment.body}
            {comment.isEdited ? (
              <Text variant="body2" color="disabled" style={{ fontSize: 12 }}>
                {' '}
                (edited)
              </Text>
            ) : (
              ''
            )}
          </Text>
          <View style={styles.footerContainer}>
            <View style={styles.buttonContainer}>
              <CommentReactionButton target={comment} shouldUseBottomSheetSafeComponents />
              <CommentReplyButton
                onReply={replyToComment}
                commentId={comment.id}
                shouldUseBottomSheetSafeComponents
              />
            </View>
            <View style={styles.timestampContainer}>
              <Timestamp date={comment.created} />
            </View>
          </View>
        </View>
      </View>
    </Pressable>
  )
}

export default CommentItem
