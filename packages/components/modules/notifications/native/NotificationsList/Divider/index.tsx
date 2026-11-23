import { FC } from 'react'

import { Text } from '@baseapp-frontend/design-system/components/native/typographies'
import { View } from '@baseapp-frontend/design-system/components/native/views'
import { useTheme } from '@baseapp-frontend/design-system/providers/native'

import { FormattedMessage } from 'react-intl'

import { createStyles } from './styles'

const Divider: FC = () => {
  const theme = useTheme()
  const styles = createStyles(theme)

  return (
    <View style={styles.container}>
      <View style={styles.line} />
      <View>
        <Text variant="caption">
          <FormattedMessage id="notifications.list.read" defaultMessage="Read" />
        </Text>
      </View>
      <View style={styles.line} />
    </View>
  )
}

export default Divider
