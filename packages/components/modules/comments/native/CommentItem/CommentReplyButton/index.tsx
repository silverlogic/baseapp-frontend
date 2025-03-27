import { FC } from 'react'

import { IconButton } from '@baseapp-frontend/design-system/components/native/buttons'
import { ReplyIcon } from '@baseapp-frontend/design-system/components/native/icons'
import { Text } from '@baseapp-frontend/design-system/components/native/typographies'
import { View } from '@baseapp-frontend/design-system/components/native/views'

import { createStyles } from './styles'
import { CommentReplyButtonProps } from './types'

const CommentReplyButton: FC<CommentReplyButtonProps> = ({ onReply, commentId }) => {
  const styles = createStyles()
  return (
    <View style={styles.replyContainer}>
      <IconButton onPress={onReply} style={{ padding: 0 }}>
        <ReplyIcon />
      </IconButton>
      <Text variant="caption" color="low" aria-label={`replies count ${commentId}`}>
        Reply
      </Text>
    </View>
  )
}

export default CommentReplyButton
