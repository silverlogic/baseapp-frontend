import { FC, useState } from 'react'

import { ConfirmDialog } from '@baseapp-frontend/design-system/components/web/dialogs'
import { BlockIcon, UnblockIcon } from '@baseapp-frontend/design-system/components/web/icons'
import { useNotification } from '@baseapp-frontend/utils'

import { Button, CircularProgress, Typography } from '@mui/material'
import { useFragment, useMutation } from 'react-relay'

import { BlockToggleMutation } from '../../../../../__generated__/BlockToggleMutation.graphql'
import { BlockToggleFragment, BlockToggleMutationQuery } from '../../../common'
import { BLOCK_UNBLOCK_DIALOG_TEXTS } from './constants'
import { ActionButton } from './styled'
import { BlockButtonWithDialogProps } from './types'

const BlockButtonWithDialog: FC<BlockButtonWithDialogProps> = ({
  target: targetRef,
  isMenu,
  handleError,
  handleCloseMenu,
  currentProfileId,
}) => {
  const target = useFragment(BlockToggleFragment, targetRef)
  const [commitMutation, isMutationInFlight] =
    useMutation<BlockToggleMutation>(BlockToggleMutationQuery)
  const { sendToast } = useNotification()
  const [open, setOpen] = useState(false)

  const isBlockedByMe = target?.isBlockedByMe

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleSuccess = () => {
    setOpen(false)
    handleCloseMenu?.()
  }

  const handleBlock = () => {
    if (isMutationInFlight || !currentProfileId || !target) {
      return
    }

    commitMutation({
      variables: {
        input: {
          targetObjectId: target.id,
          actorObjectId: currentProfileId,
        },
      },
      onCompleted: (response, errors) => {
        errors?.forEach((error) => {
          sendToast(error.message, { type: 'error' })
        })
        handleSuccess()
        sendToast(
          `${target.name ?? ''} is ${response?.blockToggle?.target?.isBlockedByMe ? 'blocked' : 'unblocked'}`,
          { type: 'info' },
        )
      },
      onError: () => {
        handleError?.()
      },
    })
  }

  return (
    <>
      <Button
        variant={isMenu ? 'text' : 'contained'}
        onClick={handleOpen}
        sx={{ justifyContent: isMenu ? 'start' : 'center' }}
        size="medium"
      >
        <Typography variant="body2" color={isMenu ? 'error.main' : 'inherit'} noWrap>
          {isBlockedByMe ? (
            <>
              <UnblockIcon sx={{ color: isMenu ? 'error.main' : 'inherit', marginRight: '5px' }} />
              {isMenu ? 'Unblock profile' : 'Unblock'}
            </>
          ) : (
            <>
              <BlockIcon sx={{ color: 'error.main', marginRight: '5px' }} />
              Block profile
            </>
          )}
        </Typography>
      </Button>
      <ConfirmDialog
        open={open}
        title={
          <div className="grid grid-cols-[min-content_1fr] gap-4 text-text-primary responsive-h6">
            {isBlockedByMe ? <UnblockIcon /> : <BlockIcon />}
            {`${isBlockedByMe ? BLOCK_UNBLOCK_DIALOG_TEXTS.unblock.title : BLOCK_UNBLOCK_DIALOG_TEXTS.block.title} ${target.name}?`}
          </div>
        }
        content={
          isBlockedByMe
            ? BLOCK_UNBLOCK_DIALOG_TEXTS.unblock.content
            : BLOCK_UNBLOCK_DIALOG_TEXTS.block.content
        }
        onClose={handleClose}
        action={
          <ActionButton
            onClick={handleBlock}
            isBlocked={isBlockedByMe}
            disabled={isMutationInFlight}
          >
            {isBlockedByMe
              ? BLOCK_UNBLOCK_DIALOG_TEXTS.unblock.action
              : BLOCK_UNBLOCK_DIALOG_TEXTS.block.action}
            {isMutationInFlight && <CircularProgress size={16} sx={{ marginLeft: '5px' }} />}
          </ActionButton>
        }
      />
    </>
  )
}

export default BlockButtonWithDialog
