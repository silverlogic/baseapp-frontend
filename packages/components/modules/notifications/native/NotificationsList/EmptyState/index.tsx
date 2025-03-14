import { FC } from 'react'

import { BellIcon } from '@baseapp-frontend/design-system/components/native/icons'
import { Text } from '@baseapp-frontend/design-system/components/native/typographies'
import { View } from '@baseapp-frontend/design-system/components/native/views'
import { useTheme } from '@baseapp-frontend/design-system/providers/native'

import { createStyles } from './styles'

const EmptyState: FC = () => {
  const theme = useTheme()
  const styles = createStyles(theme)

  return (
    <View style={styles.container}>
      <BellIcon isActive width={32} height={32} />
      <View style={styles.text}>
        <Text variant="subtitle2">You don’t have notifications.</Text>
        <Text style={styles.subText} variant="caption">
          Your future notifications will be shown here.
        </Text>
      </View>
    </View>
  )
}

export default EmptyState
