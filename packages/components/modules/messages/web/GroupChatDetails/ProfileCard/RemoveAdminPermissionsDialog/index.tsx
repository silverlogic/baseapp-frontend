import { FC } from 'react'

import { ConfirmDialog } from '@baseapp-frontend/design-system/components/web/dialogs'

import { LoadingButton } from '@mui/lab'

import { RemoveAdminPermissionsDialogProps } from './types'

const RemoveAdminPermissionsDialog: FC<RemoveAdminPermissionsDialogProps> = ({
  open,
  onClose,
  isMutationInFlight,
  onRemoveConfirmed,
}) => (
  <ConfirmDialog
    title="Remove admin permissions"
    content="This user will no longer be a group admin. You can always reassign them as admin later."
    action={
      <LoadingButton
        color="error"
        onClick={onRemoveConfirmed}
        disabled={isMutationInFlight}
        loading={isMutationInFlight}
      >
        Remove permissions
      </LoadingButton>
    }
    onClose={onClose}
    open={open}
  />
)

export default RemoveAdminPermissionsDialog
