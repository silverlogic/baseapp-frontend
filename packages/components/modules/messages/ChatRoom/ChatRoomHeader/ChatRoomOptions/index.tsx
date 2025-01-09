import { FC } from 'react'

import { MenuItem, MenuList, Typography } from '@mui/material'

import { ChatRoomOptionsProps } from './types'

const ChatRoomOptions: FC<ChatRoomOptionsProps> = ({
  onArchiveClicked,
  onDetailsClicked,
  onLeaveClicked,
}) => (
  <MenuList>
    {/* TODO: Implement archive room functionality */}
    <MenuItem onClick={onArchiveClicked}>
      <Typography variant="body2">Archive Chat</Typography>
    </MenuItem>
    <MenuItem onClick={onDetailsClicked}>
      <Typography variant="body2">Group Details</Typography>
    </MenuItem>
    <MenuItem onClick={onLeaveClicked}>
      <Typography variant="body2" color="error">
        Leave Group
      </Typography>
    </MenuItem>
  </MenuList>
)

export default ChatRoomOptions
