import { FC } from 'react'

import { MessageItemFragment } from '@baseapp-frontend/components/messages/common'
import { Text } from '@baseapp-frontend/design-system/components/native/typographies'
import { View } from '@baseapp-frontend/design-system/components/native/views'
import { useTheme } from '@baseapp-frontend/design-system/providers/native'

import { useFragment } from 'react-relay'

import { createStyles } from './styles'
import { SystemMessageProps } from './types'

const SystemMessage: FC<SystemMessageProps> = ({ messageRef }) => {
  const theme = useTheme()
  const styles = createStyles(theme)
  const message = useFragment(MessageItemFragment, messageRef)

  return (
    <View style={styles.wrapper}>
      <Text variant="caption" style={styles.text}>
        {message.content}
      </Text>
    </View>
  )
}

export { SystemMessage }
