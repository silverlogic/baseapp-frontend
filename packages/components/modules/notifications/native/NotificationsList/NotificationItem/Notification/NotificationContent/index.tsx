import { View } from '@baseapp-frontend/design-system/components/native/views'

import NotificationBody from './NotificationBody'
import NotificationHeader from './NotificationHeader'
import { createStyles } from './styles'
import { NotificationContentProps } from './types'

const NotificationContent: NotificationContentProps = ({ children }) => {
  const styles = createStyles()

  return <View style={styles.notificationContentContainer}>{children}</View>
}

NotificationContent.Header = NotificationHeader
NotificationContent.Body = NotificationBody

export default NotificationContent
