import { FC, useState } from 'react'

import { ConfirmDialog } from '@baseapp-frontend/design-system/components/web/dialogs'
import { BlockIcon, UnblockIcon } from '@baseapp-frontend/design-system/components/web/icons'
import { useNotification } from '@baseapp-frontend/utils'

import { Button, CircularProgress, MenuItem, Typography } from '@mui/material'
import { useIntl } from 'react-intl'
import { useFragment, useMutation } from 'react-relay'

import { BlockToggleMutation } from '../../../../../__generated__/BlockToggleMutation.graphql'
import { BlockToggleFragment, BlockToggleMutationQuery } from '../../../common'
import { BLOCK_UNBLOCK_DIALOG_MESSAGES as MESSAGES } from './constants'
import { ActionButton, DialogTitleContainer } from './styled'
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
  const { sendMutationErrorToast, sendToast } = useNotification()
  const [open, setOpen] = useState(false)
  const intl = useIntl()

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
        if (sendMutationErrorToast(response?.blockToggle?.errors, errors)) {
          return
        }
        handleSuccess()
        sendToast(
          intl.formatMessage(
            response?.blockToggle?.target?.isBlockedByMe
              ? MESSAGES.blockedToast
              : MESSAGES.unblockedToast,
            { name: target.name ?? '' },
          ),
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
      {isMenu ? (
        <MenuItem onClick={handleOpen} disableRipple>
          <Typography variant="body2" color="error.main" noWrap>
            {isBlockedByMe ? (
              <>
                <UnblockIcon sx={{ color: 'error.main', marginRight: '5px' }} />
                {intl.formatMessage(MESSAGES.unblockProfile)}
              </>
            ) : (
              <>
                <BlockIcon sx={{ color: 'error.main', marginRight: '5px' }} />
                {intl.formatMessage(MESSAGES.blockProfile)}
              </>
            )}
          </Typography>
        </MenuItem>
      ) : (
        <Button
          variant="contained"
          onClick={handleOpen}
          sx={{ justifyContent: 'center' }}
          size="medium"
        >
          <Typography variant="body2" color="inherit" noWrap>
            {isBlockedByMe ? (
              <>
                <UnblockIcon sx={{ color: 'inherit', marginRight: '5px' }} />
                {intl.formatMessage(MESSAGES.unblockAction)}
              </>
            ) : (
              <>
                <BlockIcon sx={{ color: 'error.main', marginRight: '5px' }} />
                {intl.formatMessage(MESSAGES.blockProfile)}
              </>
            )}
          </Typography>
        </Button>
      )}
      <ConfirmDialog
        open={open}
        title={
          <DialogTitleContainer>
            {isBlockedByMe ? <UnblockIcon /> : <BlockIcon />}
            {intl.formatMessage(isBlockedByMe ? MESSAGES.unblockTitle : MESSAGES.blockTitle, {
              name: target.name,
            })}
          </DialogTitleContainer>
        }
        content={intl.formatMessage(
          isBlockedByMe ? MESSAGES.unblockContent : MESSAGES.blockContent,
        )}
        onClose={handleClose}
        action={
          <ActionButton
            onClick={handleBlock}
            isBlocked={isBlockedByMe}
            disabled={isMutationInFlight}
          >
            {intl.formatMessage(isBlockedByMe ? MESSAGES.unblockAction : MESSAGES.blockAction)}
            {isMutationInFlight && <CircularProgress size={16} sx={{ marginLeft: '5px' }} />}
          </ActionButton>
        }
      />
    </>
  )
}

export default BlockButtonWithDialog
