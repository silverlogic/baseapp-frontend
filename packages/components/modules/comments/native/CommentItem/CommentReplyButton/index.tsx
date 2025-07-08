import { FC } from 'react'

import { IconButton } from '@baseapp-frontend/design-system/components/native/buttons'
import { ReplyIcon } from '@baseapp-frontend/design-system/components/native/icons'
import { Text } from '@baseapp-frontend/design-system/components/native/typographies'
import { View } from '@baseapp-frontend/design-system/components/native/views'

import { TouchableOpacity } from '@gorhom/bottom-sheet'

import { createStyles } from './styles'
import { CommentReplyButtonProps } from './types'

const CommentReplyButton: FC<CommentReplyButtonProps> = ({
  onReply,
  commentId,
  shouldUseBottomSheetSafeComponents,
}) => {
  const styles = createStyles()

  const replyButton = shouldUseBottomSheetSafeComponents ? (
    <TouchableOpacity onPress={onReply} style={{ padding: 0 }}>
      <ReplyIcon />
    </TouchableOpacity>
  ) : (
    <IconButton onPress={onReply} style={{ padding: 0 }}>
      <ReplyIcon />
    </IconButton>
  )

  return (
    <View style={styles.replyContainer}>
      {replyButton}
      <Text variant="caption" color="low" aria-label={`replies count ${commentId}`}>
        Reply
      </Text>
    </View>
  )
}

export default CommentReplyButton
