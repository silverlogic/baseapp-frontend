import { Markdown } from '@baseapp-frontend/design-system/components/web/markdown'

import { Box, styled } from '@mui/material'

import { MessageItemContainerProps } from './types'

export const MessageItemContainer = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'isOwnMessage' && prop !== 'isFirstGroupedMessage',
})<MessageItemContainerProps>(({ theme, isOwnMessage, isFirstGroupedMessage = false }) => {
  const ownMessageRadius = isFirstGroupedMessage ? '12px 4px 12px 12px' : '12px'
  const otherMessageRadius = isFirstGroupedMessage ? '4px 12px 12px 12px' : '12px'

  return {
    display: 'flex',
    padding: theme.spacing(1, 1.5),
    borderRadius: isOwnMessage ? ownMessageRadius : otherMessageRadius,
    flexDirection: 'column',
    maxWidth: '60%',
    justifyContent: 'center',
    alignSelf: isOwnMessage ? 'flex-end' : 'flex-start',
    alignItems: isOwnMessage ? 'flex-end' : 'flex-start',
    backgroundColor: isOwnMessage ? theme.palette.background.default : theme.palette.grey[800],
    [theme.breakpoints.down('sm')]: {
      maxWidth: '80%',
    },
  }
})

export const MessageContent = styled(Markdown, {
  shouldForwardProp: (prop) => prop !== 'isOwnMessage',
})<{ isOwnMessage: boolean }>(({ theme, isOwnMessage }) => ({
  color: isOwnMessage ? theme.palette.text.primary : theme.palette.primary.contrastText,
  maxWidth: '100%',
  overflowWrap: 'anywhere',
  wordBreak: 'normal',
}))
