import { FC, useRef, useState } from 'react'

import { useCurrentProfile } from '@baseapp-frontend/authentication'
import {
  BlockIcon,
  CopyIcon,
  DownloadIcon,
  PenEditIcon,
} from '@baseapp-frontend/design-system/components/web/icons'
import { Markdown } from '@baseapp-frontend/design-system/components/web/markdown'
import { useNotification } from '@baseapp-frontend/utils'

import { Typography } from '@mui/material'
import { useFragment } from 'react-relay'

import { ActionsOverlay, HOVER_OVERLAY_MODES } from '../../../../../../__shared__/web'
import { MessageItemFragment } from '../../../../../common'
import { useMessageDeleteMutation } from '../../../../../common/graphql/mutations/MessageDelete'
import MessageUpdate from '../../../../MessageUpdate'
import { MessageItemContainer } from './styled'
import { MessageItemProps } from './types'

const MessageItem: FC<MessageItemProps> = ({
  messageRef,
  isFirstGroupedMessage,
  isGroup = false,
}) => {
  const { currentProfile } = useCurrentProfile()
  const message = useFragment(MessageItemFragment, messageRef)
  const isOwnMessage = currentProfile?.id === message?.profile?.id
  const deletedMessage = message?.deleted
  const messageCardRef = useRef<HTMLDivElement>(null)
  const { sendToast } = useNotification()

  const [isEditMode, setIsEditMode] = useState(false)

  const [commitUpdate, isMutationInFlight] = useMessageDeleteMutation()

  const onDeleteClick = async () => {
    if (isMutationInFlight) return

    commitUpdate({
      variables: {
        input: {
          id: message.id,
        },
      },
      onCompleted: (response, errors) => {
        if (!errors) {
          sendToast('Your message was deleted', { type: 'error' })
        }
      },
    })
  }

  const deleteDialogContent = isGroup
    ? 'The message will be deleted for everyone in this chat.'
    : 'The message will be deleted for both you and the other person.'

  const renderMessageContent = () => {
    if (isEditMode) {
      return <MessageUpdate message={message} onCancel={() => setIsEditMode(false)} />
    }

    if (deletedMessage) {
      return (
        <Typography variant="body2" color="text.disabled" sx={{ maxWidth: '100%' }}>
          <BlockIcon sx={{ fontSize: '20px', color: 'grey.500' }} /> {message?.content}
        </Typography>
      )
    }

    const messageColor = isOwnMessage ? 'text.primary' : 'primary.contrastText'

    return (
      <Markdown
        sx={{
          maxWidth: '100%',
          wordBreak: 'normal',
          overflowWrap: 'anywhere',
          color: messageColor,
        }}
      >
        {message?.content}
      </Markdown>
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
          onClick: () => {
            navigator.clipboard.writeText(message?.content || '')
            sendToast('Message copied to clipboard.', { type: 'info', shouldShowProgress: true })
          },
          hasPermission: true,
        },
        {
          disabled: deletedMessage || !isOwnMessage,
          icon: <PenEditIcon />,
          label: 'Edit',
          onClick: () => {
            setIsEditMode(true)
          },
          hasPermission: isOwnMessage,
          closeOnClick: true,
        },
        {
          disabled: false,
          icon: <DownloadIcon />,
          label: 'Download Attachments',
          onClick: () => {}, // TODO: Implement download attachments
          hasPermission: true,
        },
      ]}
      hoverOverlayMode={HOVER_OVERLAY_MODES.threeDotsMenu}
      showDeleteButton
      handleDeleteItem={() => onDeleteClick()}
      isDeletingItem={isMutationInFlight}
      disableDeleteButton={!isOwnMessage || deletedMessage}
      DeleteDialogProps={{
        content: `Are you sure you want to delete this message? ${deleteDialogContent}`,
      }}
      ContainerProps={{
        flexDirection: isOwnMessage ? 'row' : 'row-reverse',
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
