import { FC, useCallback } from 'react'

import { MESSAGE_TYPE } from '@baseapp-frontend/components/messages/common'
import { Text } from '@baseapp-frontend/design-system/components/native/typographies'
import { View } from '@baseapp-frontend/design-system/components/native/views'
import { useTheme } from '@baseapp-frontend/design-system/providers/native'

import { SystemMessage as DefaultSystemMessage } from './SystemMessage'
import { UserMessage as DefaultUserMessage } from './UserMessage'
import { createStyles } from './styles'
import { MessagesGroupProps } from './types'

const MessagesGroup: FC<MessagesGroupProps> = ({
  allMessages,
  allMessagesLastIndex,
  message,
  messageIndex,
  isGroup = false,
  firstUnreadMessageId,
  SystemMessage = DefaultSystemMessage,
  SystemMessageProps = {},
  UserMessage = DefaultUserMessage,
  UserMessageProps = {},
}) => {
  const theme = useTheme()
  const styles = createStyles(theme)

  const renderUnreadMessagesDivider = useCallback(
    (index: number) => {
      const currentMessage = allMessages?.[index]

      if (currentMessage?.id === firstUnreadMessageId) {
        return (
          <View style={styles.unreadMessagesWrapper}>
            <View style={styles.unreadRedLine} />
            <View>
              <Text style={styles.newMessagesText} variant="caption">
                New Messages
              </Text>
            </View>
            <View style={styles.unreadRedLine} />
          </View>
        )
      }

      return null
    },
    [
      allMessages,
      firstUnreadMessageId,
      styles.unreadMessagesWrapper,
      styles.unreadRedLine,
      styles.newMessagesText,
    ],
  )
  if (!message) return null

  return (
    <View>
      {renderUnreadMessagesDivider(messageIndex)}
      {message.messageType === MESSAGE_TYPE.system ? (
        <SystemMessage messageRef={message} {...SystemMessageProps} />
      ) : (
        <UserMessage
          allMessages={allMessages}
          allMessagesLastIndex={allMessagesLastIndex}
          message={message}
          messageIndex={messageIndex}
          isGroup={isGroup}
          {...UserMessageProps}
        />
      )}
    </View>
  )
}

export { MessagesGroup }
