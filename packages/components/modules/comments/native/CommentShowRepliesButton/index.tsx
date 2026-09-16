import { FC } from 'react'

import { Button } from '@baseapp-frontend/design-system/components/native/buttons'
import { View } from '@baseapp-frontend/design-system/components/native/views'
import { useTheme } from '@baseapp-frontend/design-system/providers/native'

import { ActivityIndicator } from 'react-native'

import { styles } from './styles'
import { CommentShowRepliesButtonProps } from './types'

const CommentShowRepliesButton: FC<CommentShowRepliesButtonProps> = ({
  onShowReplies,
  totalRepliesCount,
  body = 'Show replies',
  showTotalRepliesCount = true,
  isLoading = false,
}) => {
  const theme = useTheme()

  return (
    <View style={styles.showRepliesButtonContainer}>
      <Button
        mode="text"
        color="inherit"
        size="small"
        compact
        disabled={isLoading}
        onPress={onShowReplies}
      >
        {body} {showTotalRepliesCount && `(${totalRepliesCount})`}
      </Button>
      {/* Always-mounted fixed-size slot so the row width doesn't change when the spinner toggles. */}
      <View style={styles.spinnerSlot}>
        {isLoading && <ActivityIndicator size="small" color={theme.colors.object.high} />}
      </View>
    </View>
  )
}

export default CommentShowRepliesButton
