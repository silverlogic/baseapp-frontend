import { FC } from 'react'

import { MenuItem, MenuList, Typography } from '@mui/material'
import { FormattedMessage } from 'react-intl'

import { SHARED_MESSAGES } from '../../../__shared__/constants'
import { AdminOptionsProps } from './types'

const AdminOptionsMenu: FC<AdminOptionsProps> = ({
  onViewProfileClicked,
  onToggleAdminClicked,
  onRemoveClicked,
  isAdmin,
}) => (
  <MenuList>
    <MenuItem onClick={onViewProfileClicked}>
      <Typography variant="body2">
        <FormattedMessage {...SHARED_MESSAGES.seeProfile} />
      </Typography>
    </MenuItem>
    <MenuItem onClick={onToggleAdminClicked}>
      <Typography variant="body2">
        {isAdmin ? (
          <FormattedMessage
            id="messages.groupChatDetails.adminOptions.removeAdmin"
            defaultMessage="Remove admin permissions"
          />
        ) : (
          <FormattedMessage
            id="messages.groupChatDetails.adminOptions.promoteToAdmin"
            defaultMessage="Promote to admin"
          />
        )}
      </Typography>
    </MenuItem>
    <MenuItem onClick={onRemoveClicked}>
      <Typography variant="body2" color="error">
        <FormattedMessage
          id="messages.groupChatDetails.adminOptions.removeFromGroup"
          defaultMessage="Remove from group"
        />
      </Typography>
    </MenuItem>
  </MenuList>
)

export default AdminOptionsMenu
