import { FC } from 'react'

import { Text } from '@baseapp-frontend/design-system/components/native/typographies'
import { View } from '@baseapp-frontend/design-system/components/native/views'
import { useTheme } from '@baseapp-frontend/design-system/providers/native'

import { Pressable } from 'react-native'

import { createStyles } from './styles'
import { CommentHideRepliesButtonProps } from './types'

const CommentHideRepliesButton: FC<CommentHideRepliesButtonProps> = ({ onHideReplies }) => {
  const theme = useTheme()
  const styles = createStyles(theme)

  return (
    <View style={styles.hideRepliesButtonContainer}>
      <Pressable onPress={onHideReplies} style={styles.hideRepliesButton}>
        <Text style={styles.hideRepliesButtonText}>Hide replies</Text>
      </Pressable>
    </View>
  )
}

export default CommentHideRepliesButton
