import { FC } from 'react'

import { View } from '@baseapp-frontend/design-system/components/native/views'
import { useTheme } from '@baseapp-frontend/design-system/providers/native'

import { createStyles } from './styles'

const DrawerHandle: FC = () => {
  const theme = useTheme()
  const styles = createStyles(theme)

  return (
    <View style={styles.handleContainer}>
      <View style={styles.draggable} />
    </View>
  )
}

export default DrawerHandle
