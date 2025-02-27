import { FC } from 'react'

import { Text } from '@baseapp-frontend/design-system/components/native/typographies'
import { View } from '@baseapp-frontend/design-system/components/native/views'
import { useTheme } from '@baseapp-frontend/design-system/providers/native'

import { createStyles } from './styles'
import { NotificationBodyProps } from './types'

const NotificationBody: FC<NotificationBodyProps> = ({ content }) => {
  const theme = useTheme()
  const styles = createStyles(theme)

  return (
    <View style={styles.notificationBodyContainer}>
      <Text variant="body2" color="low" numberOfLines={2} ellipsizeMode="tail">
        {content ?? ''}
      </Text>
    </View>
  )
}

export default NotificationBody
