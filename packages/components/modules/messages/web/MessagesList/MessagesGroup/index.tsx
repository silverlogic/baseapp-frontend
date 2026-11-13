import { FC, useCallback } from 'react'

import { datesDontHaveSameDay } from '@baseapp-frontend/utils'

import { Box, Divider, Typography, useTheme } from '@mui/material'
import { useIntl } from 'react-intl'

import { MESSAGE_TYPE } from '../../../common'
import DefaultSystemMessage from './SystemMessage'
import DefaultUserMessage from './UserMessage'
import { MESSAGES_GROUP_MESSAGES } from './constants'
import { DateGroupTypography } from './styled'
import { MessagesGroupProps } from './types'
import { displayFormattedDate } from './utils'

const MessagesGroup: FC<MessagesGroupProps> = ({
  allMessages,
  allMessagesLastIndex,
  hasNext,
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
  const intl = useIntl()

  const renderDateOnTopOfMessagesGroup = useCallback(
    (index: number) => {
      const previousMessage = allMessages?.[index + 1]
      const currentMessage = allMessages?.[index]
      const isLastMessageAvailable = index === allMessagesLastIndex && !hasNext

      if (
        isLastMessageAvailable ||
        datesDontHaveSameDay(previousMessage?.created, currentMessage?.created)
      ) {
        return (
          <DateGroupTypography color="grey.600" variant="caption">
            {displayFormattedDate(intl, currentMessage?.created)}
          </DateGroupTypography>
        )
      }

      return null
    },
    [allMessages, allMessagesLastIndex, hasNext, intl],
  )

  const renderUnreadMessagesDivider = useCallback(
    (index: number) => {
      const currentMessage = allMessages?.[index]

      if (currentMessage?.id === firstUnreadMessageId) {
        return (
          <Divider
            variant="fullWidth"
            sx={{
              '&.MuiDivider-root::before, &.MuiDivider-root::after': {
                borderTop: `1px solid ${theme.palette.error.light}`,
              },
            }}
          >
            <Typography variant="caption" color="error" sx={{ textAlign: 'center' }}>
              {intl.formatMessage(MESSAGES_GROUP_MESSAGES.newMessages)}
            </Typography>
          </Divider>
        )
      }

      return null
    },
    [allMessages, firstUnreadMessageId, theme.palette.error.light, intl],
  )

  if (!message) return null

  return (
    <Box display="flex" flexDirection="column" sx={{ paddingTop: 1 / 2, paddingRight: 2 }}>
      {renderUnreadMessagesDivider(messageIndex)}
      {renderDateOnTopOfMessagesGroup(messageIndex)}
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
    </Box>
  )
}

export default MessagesGroup
