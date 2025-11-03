import { FC, useCallback, useMemo } from 'react'

import { useCurrentProfile } from '@baseapp-frontend/authentication'
import { AvatarWithPlaceholder } from '@baseapp-frontend/design-system/components/web/avatars'

import { Box, Typography } from '@mui/material'
import { DateTime } from 'luxon'

import { MAXIMUM_DIFF_TO_GROUP_MESSAGES_CREATED_TIME } from '../../../../common'
import DefaultMessageItem from './MessageItem'
import Timestamp from './Timestamp'
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
  const isProfileNullOrUndefined = message?.profile == null || message?.profile === undefined

  const renderLastMessageTime = useCallback(
    (index: number) => {
      const currentMessage = allMessages?.[index]
      const nextMessage = allMessages?.[index - 1]

      const isNextMessageFromOtherParticipant =
        nextMessage?.profile?.id !== currentMessage?.profile?.id

      const { minutes: dateDiff } = DateTime.fromISO(nextMessage?.created).diff(
        DateTime.fromISO(currentMessage?.created),
        'minutes',
      )
      const isDateDiffAboveMaximumInterval = dateDiff > MAXIMUM_DIFF_TO_GROUP_MESSAGES_CREATED_TIME

      if (isNextMessageFromOtherParticipant || !nextMessage || isDateDiffAboveMaximumInterval) {
        return <Timestamp date={currentMessage?.created} />
      }

      return null
    },
    [allMessages],
  )

  const isFirstGroupedMessage = useMemo(() => {
    const currentMessage = allMessages?.[messageIndex]
    const previousMessage = allMessages?.[messageIndex + 1]
    const isFirstMessageAtTheTop = previousMessage?.isRead === null

    const isPreviousMessageFromOtherParticipant =
      previousMessage?.profile?.id !== currentMessage?.profile?.id
    const roomHasOnlyOneMessage = allMessagesLastIndex === 0
    if (isPreviousMessageFromOtherParticipant || roomHasOnlyOneMessage || isFirstMessageAtTheTop)
      return true

    return false
  }, [allMessages, allMessagesLastIndex, messageIndex])

  const isOwnMessage = currentProfile?.id === message?.profile?.id
  const flexAlignments = isOwnMessage ? 'flex-end' : 'flex-start'

  const canShowAvatar =
    (isProfileNullOrUndefined && isFirstGroupedMessage) || (isFirstGroupedMessage && !isOwnMessage)
  const canShowName = canShowAvatar && isGroup

  if (!message) return null

  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', alignSelf: flexAlignments, width: '100%' }}>
      {canShowAvatar && (
        <Box paddingRight="12px">
          <AvatarWithPlaceholder
            className="self-start justify-self-center"
            width={32}
            height={32}
            src={message?.profile?.image?.url}
            sx={{ border: 'none' }}
            showDeletedUser={isProfileNullOrUndefined}
          />
        </Box>
      )}
      <Box
        sx={{
          display: 'flex',
          ml: isFirstGroupedMessage ? 0 : 5.5,
          alignSelf: flexAlignments,
          alignItems: flexAlignments,
          flexDirection: 'column',
          width: '100%',
        }}
      >
        {canShowName && (
          <Typography variant="subtitle2" color="text.primary" marginBottom={1 / 2}>
            {isProfileNullOrUndefined ? 'Deleted User' : message?.profile?.name}
          </Typography>
        )}
        <MessageItem
          messageRef={message}
          isGroup={isGroup}
          isFirstGroupedMessage={isFirstGroupedMessage}
          {...MessageItemProps}
        />
        {renderLastMessageTime(messageIndex)}
      </Box>
    </Box>
  )
}

export default UserMessage
