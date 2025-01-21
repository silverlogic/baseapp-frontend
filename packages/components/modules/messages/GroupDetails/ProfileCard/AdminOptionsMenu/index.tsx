import { FC } from 'react'

import { MenuItem, MenuList, Typography } from '@mui/material'

import { AdminOptionsProps } from './types'

const AdminOptionsMenu: FC<AdminOptionsProps> = ({
  isAdmin,
  isMe,
  onToggleAdminClicked,
  onRemoveClicked,
}) => (
  <MenuList>
    <MenuItem onClick={onToggleAdminClicked} disabled={isMe}>
      <Typography variant="body2">{isAdmin ? 'Make normal user' : 'Make Admin'}</Typography>
    </MenuItem>
    <MenuItem onClick={onRemoveClicked} disabled={isMe}>
      <Typography variant="body2" color="error">
        Remove
      </Typography>
    </MenuItem>
  </MenuList>
)

export default AdminOptionsMenu
