import { Text } from '@baseapp-frontend/design-system/components/native/typographies'
import { View } from '@baseapp-frontend/design-system/components/native/views'
import { useTheme } from '@baseapp-frontend/design-system/providers/native'

import { createStyles } from './styles'
import { EmptyViewProps } from './types'

const EmptyView = ({ icon, title, message }: EmptyViewProps) => {
  const theme = useTheme()
  const styles = createStyles(theme)

  return (
    <View style={styles.container}>
      {icon && <View style={styles.imageWrapper}>{icon}</View>}
      <View style={styles.textWrapper}>
        {title && (
          <Text variant="subtitle2" style={styles.text}>
            {title}
          </Text>
        )}
        {message && (
          <Text variant="caption" style={styles.text}>
            {message}
          </Text>
        )}
      </View>
    </View>
  )
}

export default EmptyView
