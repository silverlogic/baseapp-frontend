import { FC, useRef, useState } from 'react'

import { useCurrentProfile } from '@baseapp-frontend/authentication'
import { CopyIcon, DownloadIcon, PenEditIcon } from '@baseapp-frontend/design-system'

import { Typography } from '@mui/material'
import { useFragment } from 'react-relay'

import ActionsOverlay from '../../../../__shared__/ActionsOverlay'
import MessageUpdate from '../../../MessageUpdate'
import { MessageItemFragment } from '../../../graphql/queries/MessageItem'
import { MessageItemContainer } from './styled'
import { MessageItemProps } from './types'

const MessageItem: FC<MessageItemProps> = ({ messageRef, isFirstGroupedMessage }) => {
  const { currentProfile } = useCurrentProfile()
  const message = useFragment(MessageItemFragment, messageRef)
  const isOwnMessage = currentProfile?.id === message?.profile?.id
  const messageCardRef = useRef<HTMLDivElement>(null)

  const [isEditMode, setIsEditMode] = useState(false)

  const renderMessageContent = () => {
    if (isEditMode) {
      return <MessageUpdate message={message} onCancel={() => setIsEditMode(false)} />
    }

    return (
      <Typography
        variant="body2"
        color={isOwnMessage ? 'text.primary' : 'primary.contrastText'}
        sx={{
          maxWidth: '100%',
          whiteSpace: 'pre-wrap',
          wordBreak: 'normal',
          overflowWrap: 'anywhere',
        }}
      >
        {message?.content}
      </Typography>
    )
  }

  return (
    <ActionsOverlay
      title="message"
      actions={[
        {
          disabled: false,
          icon: <CopyIcon />,
          label: 'Copy',
          onClick: () => {}, // TODO: Implement copy message
          hasPermission: true,
        },
        {
          disabled: false,
          icon: <PenEditIcon />,
          label: 'Edit',
          onClick: () => {
            setIsEditMode(true)
          },
          hasPermission: isOwnMessage,
        },
        {
          disabled: false,
          icon: <DownloadIcon />,
          label: 'Download Attachments',
          onClick: () => {}, // TODO: Implement download attachments
          hasPermission: true,
        },
      ]}
      useTreedotsMenuOverlay
      enableDelete
      handleDeleteItem={() => {}} // TODO: Implement delete message
      isDeletingItem={false}
      ContainerProps={{
        width: '100%',
        display: 'flex',
        flexDirection: isOwnMessage ? 'row' : 'row-reverse',
        justifyContent: 'flex-end',
      }}
      ref={messageCardRef}
    >
      <MessageItemContainer
        isOwnMessage={isOwnMessage}
        isFirstGroupedMessage={isFirstGroupedMessage}
        {...(isEditMode && { sx: { width: '100%' } })}
      >
        {renderMessageContent()}
      </MessageItemContainer>
    </ActionsOverlay>
  )
}

export default MessageItem
