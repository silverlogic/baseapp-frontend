import { PinIcon } from '@baseapp-frontend/design-system/components/native/icons'
import { Text } from '@baseapp-frontend/design-system/components/native/typographies'
import { View } from '@baseapp-frontend/design-system/components/native/views'
import { useTheme } from '@baseapp-frontend/design-system/providers/native'

import { createStyles } from './styles'

const CommentPinBadge = () => {
  const theme = useTheme()
  const styles = createStyles(theme)

  return (
    <View style={styles.pinContainer}>
      <PinIcon style={styles.pinIcon} />
      <Text style={styles.pinText}>Pinned</Text>
    </View>
  )
}

export default CommentPinBadge
