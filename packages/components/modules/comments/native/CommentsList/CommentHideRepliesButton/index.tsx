import { FC } from 'react'

import { Button } from '@baseapp-frontend/design-system/components/native/buttons'
import { View } from '@baseapp-frontend/design-system/components/native/views'

import { FormattedMessage } from 'react-intl'

import { styles } from './styles'
import { CommentHideRepliesButtonProps } from './types'

const CommentHideRepliesButton: FC<CommentHideRepliesButtonProps> = ({ onHideReplies }) => (
  <View style={styles.hideRepliesButtonContainer}>
    <Button mode="text" color="inherit" size="small" compact onPress={onHideReplies}>
      <FormattedMessage id="comments.replies.hide" defaultMessage="Hide replies" />
    </Button>
  </View>
)

export default CommentHideRepliesButton
