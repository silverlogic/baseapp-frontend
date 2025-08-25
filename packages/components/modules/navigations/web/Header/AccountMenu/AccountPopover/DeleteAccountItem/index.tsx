import { FC, useState } from 'react'

import { useDeleteAccount } from '@baseapp-frontend/authentication'
import { ConfirmDialog } from '@baseapp-frontend/design-system/components/web/dialogs'
import {
  AlertTriangleIcon,
  TrashCanIcon,
} from '@baseapp-frontend/design-system/components/web/icons'

import { LoadingButton } from '@mui/lab'
import { Box, ButtonBase, MenuItem, Typography } from '@mui/material'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'

import { AlertBoxStyled } from './styled'
import { DeleteAccountItemProps } from './types'

const DeleteAccountItem: FC<DeleteAccountItemProps> = ({
  handlePopoverOnClose,
  deleteAccountButtonLabel = 'Delete Account',
}) => {
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false)

  const handleClose = () => {
    setConfirmDialogOpen(false)
    handlePopoverOnClose()
  }

  const deleteAccountMutation = useDeleteAccount({
    onSuccess: () => {
      handleClose()
    },
    onError: (error) => {
      // Error handling is managed by the mutation's isError and error states
      console.error('Failed to delete account:', error)
    },
  })

  const handleDeleteAccount = () => {
    deleteAccountMutation.mutate()
  }

  return (
    <>
      <ConfirmDialog
        title={
          <Box display="flex" alignItems="center" gap={1}>
            <TrashCanIcon sx={{ color: 'text.primary' }} />
            <Typography variant="h6" component="span">
              Confirm Account Deletion
            </Typography>
          </Box>
        }
        customMaxWidth={480}
        DialogContentProps={{
          sx: {
            padding: 0,
            typography: 'body1',
            color: 'text.primary',
          },
        }}
        open={confirmDialogOpen}
        onClose={handleClose}
        content={
          <Box p={3} display="flex" flexDirection="column" gap={1}>
            <Typography variant="body1">Are you sure you want to delete your account?</Typography>
            <List sx={{ mt: 2 }}>
              <ListItem sx={{ py: 0 }}>
                <Typography variant="body1">
                  • Your profile and personal data will be permanently deleted
                </Typography>
              </ListItem>
              <ListItem sx={{ py: 0 }}>
                <Typography variant="body1">
                  • You&apos;ll lose access to all your content and saved information
                </Typography>
              </ListItem>
            </List>
            <AlertBoxStyled>
              <AlertTriangleIcon color="error" />
              <Typography variant="body2" color="error.darker">
                Attention, this action is permanent and cannot be reversed.
              </Typography>
            </AlertBoxStyled>
          </Box>
        }
        action={
          <LoadingButton
            color="inherit"
            // variant="outlined"
            onClick={handleDeleteAccount}

            // disabled={isMutationInFlight || isEditButtonDisabled}
            // loading={isMutationInFlight || isPending}
          >
            Delete Account
          </LoadingButton>
        }
      />

      <MenuItem
        type="button"
        tabIndex={0}
        component={ButtonBase}
        onClick={() => {
          // handlePopoverOnClose()
          setConfirmDialogOpen(true)
        }}
        sx={{ fontWeight: 'fontWeightBold', color: 'error.main' }}
      >
        {deleteAccountButtonLabel}
      </MenuItem>
    </>
  )
}

export default DeleteAccountItem
