import { FC } from 'react'

import { MenuItem, MenuList, Typography } from '@mui/material'

import { AdminOptionsProps } from './types'

const AdminOptionsMenu: FC<AdminOptionsProps> = ({
  onViewProfileClicked,
  onToggleAdminClicked,
  onRemoveClicked,
  isAdmin,
}) => (
  <MenuList>
    <MenuItem onClick={onViewProfileClicked}>
      <Typography variant="body2">See Profile</Typography>
    </MenuItem>
    <MenuItem onClick={onToggleAdminClicked}>
      <Typography variant="body2">
        {isAdmin ? 'Remove admin permissions' : 'Promote to admin'}
      </Typography>
    </MenuItem>
    <MenuItem onClick={onRemoveClicked}>
      <Typography variant="body2" color="error">
        Remove from group
      </Typography>
    </MenuItem>
  </MenuList>
)

export default AdminOptionsMenu
