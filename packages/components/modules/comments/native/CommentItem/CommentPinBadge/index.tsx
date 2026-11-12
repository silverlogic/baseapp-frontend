import { PinIcon } from '@baseapp-frontend/design-system/components/native/icons'
import { Text } from '@baseapp-frontend/design-system/components/native/typographies'
import { View } from '@baseapp-frontend/design-system/components/native/views'
import { useTheme } from '@baseapp-frontend/design-system/providers/native'

import { useIntl } from 'react-intl'

import { createStyles } from './styles'

const CommentPinBadge = () => {
  const intl = useIntl()
  const theme = useTheme()
  const styles = createStyles(theme)

  return (
    <View style={styles.pinContainer}>
      <PinIcon style={styles.pinIcon} />
      <Text style={styles.pinText}>
        {intl.formatMessage({ id: 'comments.pinned.badge', defaultMessage: 'Pinned' })}
      </Text>
    </View>
  )
}

export default CommentPinBadge
