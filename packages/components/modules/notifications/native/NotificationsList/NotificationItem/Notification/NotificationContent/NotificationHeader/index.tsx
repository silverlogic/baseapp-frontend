import { FC } from 'react'

import { Badge } from '@baseapp-frontend/design-system/components/native/badges'
import { Text } from '@baseapp-frontend/design-system/components/native/typographies'
import { View } from '@baseapp-frontend/design-system/components/native/views'
import { useTheme } from '@baseapp-frontend/design-system/providers/native'

import { createStyles } from './styles'
import { NotificationHeaderProps } from './types'

const NotificationHeader: FC<NotificationHeaderProps> = ({
  actorName,
  message,
  unread,
  timestamp,
}) => {
  const theme = useTheme()
  const styles = createStyles(theme)

  return (
    <View style={styles.headerContainer}>
      <View style={styles.textWithBadgeContainer}>
        <View style={styles.headerTextContainer}>
          <Text variant="subtitle2" color="high">
            {actorName ?? ''}{' '}
          </Text>
          <Text variant="body2" color="high">
            {message}
          </Text>
        </View>
        <View>{unread && <Badge size={10} style={styles.badge} />}</View>
      </View>
      <Text variant="body2" color="disabled">
        {timestamp}
      </Text>
    </View>
  )
}

export default NotificationHeader
