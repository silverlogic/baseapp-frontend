import { FC } from 'react'

import { Text } from '@baseapp-frontend/design-system/components/native/typographies'
import { View } from '@baseapp-frontend/design-system/components/native/views'
import { useTheme } from '@baseapp-frontend/design-system/providers/native'

import { ActivityIndicator, Pressable } from 'react-native'

import { createStyles } from './styles'
import { CommentShowRepliesButtonProps } from './types'

const CommentShowRepliesButton: FC<CommentShowRepliesButtonProps> = ({
  onShowReplies,
  totalRepliesCount,
  body = 'Show replies',
  showTotalRepliesCount = true,
  isLoading = false,
}) => {
  const theme = useTheme()
  const styles = createStyles(theme)

  return (
    <View style={styles.showRepliesButtonContainer}>
      <Pressable onPress={onShowReplies} style={styles.showRepliesButton} disabled={isLoading}>
        <Text style={styles.showRepliesButtonText}>
          {body} {showTotalRepliesCount && `(${totalRepliesCount})`}
        </Text>
      </Pressable>
      {isLoading && <ActivityIndicator size="small" color={theme.colors.object.high} />}
    </View>
  )
}

export default CommentShowRepliesButton
