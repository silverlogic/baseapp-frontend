import { FC, PropsWithChildren } from 'react'

import { View } from '@baseapp-frontend/design-system/components/native/views'

import { createStyles } from './styles'

const NotificationRoot: FC<PropsWithChildren> = ({ children }) => {
  const styles = createStyles()

  return <View style={styles.notificationRootContainer}>{children}</View>
}

export default NotificationRoot
