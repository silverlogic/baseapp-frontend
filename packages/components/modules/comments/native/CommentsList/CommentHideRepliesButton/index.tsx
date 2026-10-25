import { FC } from 'react'

import { Button } from '@baseapp-frontend/design-system/components/native/buttons'
import { View } from '@baseapp-frontend/design-system/components/native/views'

import { useIntl } from 'react-intl'

import { styles } from './styles'
import { CommentHideRepliesButtonProps } from './types'

const CommentHideRepliesButton: FC<CommentHideRepliesButtonProps> = ({ onHideReplies }) => {
  const intl = useIntl()

  return (
    <View style={styles.hideRepliesButtonContainer}>
      <Button mode="text" color="inherit" size="small" compact onPress={onHideReplies}>
        {intl.formatMessage({ id: 'comments.replies.hide', defaultMessage: 'Hide replies' })}
      </Button>
    </View>
  )
}

export default CommentHideRepliesButton
