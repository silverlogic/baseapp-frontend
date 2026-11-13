import { FC } from 'react'

import { ConfirmDialog } from '@baseapp-frontend/design-system/components/web/dialogs'

import { LoadingButton } from '@mui/lab'
import { useIntl } from 'react-intl'

import { RemoveAdminPermissionsDialogProps } from './types'

const RemoveAdminPermissionsDialog: FC<RemoveAdminPermissionsDialogProps> = ({
  open,
  onClose,
  isMutationInFlight,
  onRemoveConfirmed,
}) => {
  const intl = useIntl()

  return (
    <ConfirmDialog
      title={intl.formatMessage({
        id: 'messages.groupChatDetails.removeAdminDialog.title',
        defaultMessage: 'Remove admin permissions',
      })}
      content={intl.formatMessage({
        id: 'messages.groupChatDetails.removeAdminDialog.content',
        defaultMessage:
          'This user will no longer be a group admin. You can always reassign them as admin later.',
      })}
      action={
        <LoadingButton
          color="error"
          onClick={onRemoveConfirmed}
          disabled={isMutationInFlight}
          loading={isMutationInFlight}
        >
          {intl.formatMessage({
            id: 'messages.groupChatDetails.removeAdminDialog.confirm',
            defaultMessage: 'Remove permissions',
          })}
        </LoadingButton>
      }
      onClose={onClose}
      open={open}
    />
  )
}

export default RemoveAdminPermissionsDialog
