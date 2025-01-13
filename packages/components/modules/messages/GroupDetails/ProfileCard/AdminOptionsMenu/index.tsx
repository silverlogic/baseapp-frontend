import { FC } from 'react'

import { MenuItem, MenuList, Typography } from '@mui/material'

import { AdminOptionsProps } from './types'

const AdminOptionsMenu: FC<AdminOptionsProps> = ({ onMakeAdminClicked, onRemoveClicked }) => (
  <MenuList>
    <MenuItem onClick={onMakeAdminClicked}>
      <Typography variant="body2">Make Admin</Typography>
    </MenuItem>
    <MenuItem onClick={onRemoveClicked}>
      <Typography variant="body2" color="error">
        Remove
      </Typography>
    </MenuItem>
  </MenuList>
)

export default AdminOptionsMenu
