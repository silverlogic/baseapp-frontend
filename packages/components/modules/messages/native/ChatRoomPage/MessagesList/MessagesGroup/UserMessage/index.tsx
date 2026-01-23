import { FC, useMemo } from 'react'

import { useCurrentProfile } from '@baseapp-frontend/authentication'
import { AvatarWithPlaceholder } from '@baseapp-frontend/design-system/components/native/avatars'
import { View } from '@baseapp-frontend/design-system/components/native/views'
import { useTheme } from '@baseapp-frontend/design-system/providers/native'

import { MessageItem as DefaultMessageItem } from './MessageItem'
import { createStyles } from './styles'
import { UserMessageProps } from './types'

const UserMessage: FC<UserMessageProps> = ({
  allMessages,
  allMessagesLastIndex,
  message,
  messageIndex,
  isGroup = false,
  MessageItem = DefaultMessageItem,
  MessageItemProps = {},
}) => {
  const { currentProfile } = useCurrentProfile()
  const theme = useTheme()
  const styles = createStyles(theme)

  const isFirstGroupedMessage = useMemo(() => {
    const currentMessage = allMessages?.[messageIndex]
    const previousMessage = allMessages?.[messageIndex + 1]

    const isPreviousMessageFromOtherParticipant =
      previousMessage?.profile?.id !== currentMessage?.profile?.id
    const roomHasOnlyOneMessage = allMessagesLastIndex === 0

    return isPreviousMessageFromOtherParticipant || roomHasOnlyOneMessage
  }, [allMessages, allMessagesLastIndex, messageIndex])
  const isOwnMessage = message?.profile?.id === currentProfile?.id
  /* TODO: Extract into functions and reuse on web and mobile */
  const canShowAvatar = isFirstGroupedMessage && !isOwnMessage

  if (!message) return null

  return (
    <View style={[styles.wrapper, isOwnMessage ? styles.ownWrapper : styles.receivedWrapper]}>
      {!isOwnMessage && (
        <View style={{ ...styles.avatarContainer }}>
          {canShowAvatar && (
            <AvatarWithPlaceholder size={32} imgSource={message?.profile?.image?.url} />
          )}
        </View>
      )}

      <View
        style={[
          styles.messageWrapper,
          isOwnMessage ? styles.ownMessageAlign : styles.receivedMessageAlign,
        ]}
      >
        <MessageItem
          messageRef={message}
          isGroup={isGroup}
          isFirstGroupedMessage={isFirstGroupedMessage}
          isOwnMessage={isOwnMessage}
          {...MessageItemProps}
        />
      </View>
    </View>
  )
}

export { UserMessage }
