import { FC } from 'react'

import { MenuItem, MenuList, Typography } from '@mui/material'

import { AdminOptionsProps } from './types'

const AdminOptionsMenu: FC<AdminOptionsProps> = ({
  onViewProfileClicked,
  onToggleAdminClicked,
  onRemoveClicked,
}) => (
  <MenuList>
    <MenuItem onClick={onViewProfileClicked}>
      <Typography variant="body2">View Profile</Typography>
    </MenuItem>
    <MenuItem onClick={onToggleAdminClicked}>
      <Typography variant="body2">Make Admin</Typography>
    </MenuItem>
    <MenuItem onClick={onRemoveClicked}>
      <Typography variant="body2" color="error">
        Remove from chat
      </Typography>
    </MenuItem>
  </MenuList>
)

export default AdminOptionsMenu
