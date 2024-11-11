import { Box, styled } from '@mui/material'

import { MessageItemContainerProps } from './types'

export const MessageItemContainer = styled(Box)<MessageItemContainerProps>(({
  theme,
  isOwnMessage,
  isFirstGroupedMessage = false,
}) => {
  const ownMessageRadius = isFirstGroupedMessage ? '12px 4px 12px 12px' : '12px'
  const otherMessageRadius = isFirstGroupedMessage ? '4px 12px 12px 12px' : '12px'

  return {
    display: 'flex',
    padding: theme.spacing(1, 1.5),
    borderRadius: isOwnMessage ? ownMessageRadius : otherMessageRadius,
    flexDirection: 'column',
    maxWidth: '400px',
    justifyContent: 'center',
    alignSelf: isOwnMessage ? 'flex-end' : 'flex-start',
    alignItems: isOwnMessage ? 'flex-end' : 'flex-start',
    backgroundColor: isOwnMessage ? theme.palette.background.default : theme.palette.grey[800],
  }
})
