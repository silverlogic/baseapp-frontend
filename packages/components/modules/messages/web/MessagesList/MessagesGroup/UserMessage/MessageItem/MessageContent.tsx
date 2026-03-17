import { FC } from 'react'

import { useCurrentProfile } from '@baseapp-frontend/authentication'
import { BlockIcon } from '@baseapp-frontend/design-system/components/web/icons'
import { Markdown, MarkdownProps } from '@baseapp-frontend/design-system/components/web/markdowns'

import { Typography } from '@mui/material'

import { MessageContentProps } from './types'

const MessageContent: FC<MessageContentProps> = ({ message }) => {
  const { currentProfile } = useCurrentProfile()
  const isOwnMessage = currentProfile?.id === message?.profile?.id

  const deletedMessage = message?.deleted

  let messageColor = isOwnMessage ? 'text.primary' : 'primary.contrastText'

  if (deletedMessage) {
    messageColor = 'text.disabled'
  }

  const components: MarkdownProps['components'] = {
    // eslint-disable-next-line react/no-unstable-nested-components
    p: ({ children, ...props }) => (
      <Typography
        variant="body2"
        color={messageColor}
        sx={{
          maxWidth: '100%',
          whiteSpace: 'pre-wrap',
          wordBreak: 'normal',
          overflowWrap: 'anywhere',
        }}
        {...props}
      >
        {deletedMessage && <BlockIcon sx={{ fontSize: '20px', color: 'grey.500', mr: 1 }} />}
        {children}
      </Typography>
    ),
  }

  return (
    <div style={{ maxWidth: '100%' }}>
      <Markdown components={components}>{message?.content}</Markdown>
    </div>
  )
}

export default MessageContent
