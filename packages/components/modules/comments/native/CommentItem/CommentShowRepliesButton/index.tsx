import { FC } from 'react'

import { Text } from '@baseapp-frontend/design-system/components/native/typographies'
import { View } from '@baseapp-frontend/design-system/components/native/views'
import { useTheme } from '@baseapp-frontend/design-system/providers/native'

import { Pressable } from 'react-native'

import { createStyles } from './styles'
import { CommentShowRepliesButtonProps } from './types'

const CommentShowRepliesButton: FC<CommentShowRepliesButtonProps> = ({
  onShowReplies,
  totalRepliesCount,
}) => {
  const theme = useTheme()
  const styles = createStyles(theme)

  return (
    <View style={styles.showRepliesButtonContainer}>
      <Pressable onPress={onShowReplies} style={styles.showRepliesButton}>
        <Text style={styles.showRepliesButtonText}>Show replies ({totalRepliesCount})</Text>
      </Pressable>
    </View>
  )
}

export default CommentShowRepliesButton
