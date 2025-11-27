import { FC } from 'react'

import { useCurrentProfile } from '@baseapp-frontend/authentication'
import { MessageItemFragment } from '@baseapp-frontend/components/messages/common'
import { Text } from '@baseapp-frontend/design-system/components/native/typographies'
import { View } from '@baseapp-frontend/design-system/components/native/views'
import { useTheme } from '@baseapp-frontend/design-system/providers/native'

import { useFragment } from 'react-relay'

import { createStyles } from './styles'
import { MessageItemProps } from './types'

const MessageItem: FC<MessageItemProps> = ({ messageRef }) => {
  const { currentProfile } = useCurrentProfile()
  const theme = useTheme()
  const styles = createStyles(theme)

  const message = useFragment(MessageItemFragment, messageRef)
  const isOwnMessage = currentProfile?.id === message?.profile?.id

  const renderMessageContent = () => (
    <Text
      variant="body2"
      style={[styles.messageBubble, isOwnMessage ? styles.ownBubble : styles.receivedBubble]}
    >
      {message?.content}
    </Text>
  )

  return <View>{renderMessageContent()}</View>
}

export { MessageItem }
