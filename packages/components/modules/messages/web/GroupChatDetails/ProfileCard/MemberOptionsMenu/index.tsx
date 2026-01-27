import { FC } from 'react'

import { MenuItem, MenuList, Typography } from '@mui/material'

import { MemberOptionsMenuProps } from './types'

const MemberOptionsMenu: FC<MemberOptionsMenuProps> = ({
  isMe,
  onViewProfileClicked,
  onRemoveClicked,
}) => (
  <MenuList>
    <MenuItem onClick={onViewProfileClicked}>
      <Typography variant="body2">See Profile</Typography>
    </MenuItem>
    {isMe && (
      <MenuItem onClick={onRemoveClicked}>
        <Typography variant="body2" color="error">
          Leave Group
        </Typography>
      </MenuItem>
    )}
  </MenuList>
)

export default MemberOptionsMenu
