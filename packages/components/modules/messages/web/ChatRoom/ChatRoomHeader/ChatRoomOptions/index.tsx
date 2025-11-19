import { FC } from 'react'

import { MenuItem, MenuList, Typography } from '@mui/material'

import { ChatRoomOptionsProps } from './types'

const ChatRoomOptions: FC<ChatRoomOptionsProps> = ({
  isArchived,
  isArchiveMutationInFlight,
  isGroup,
  onArchiveClicked,
  onDetailsClicked,
  onLeaveClicked,
  onContactDetailsClicked,
}) => (
  <MenuList>
    <MenuItem onClick={onArchiveClicked} disabled={isArchiveMutationInFlight}>
      <Typography variant="body2">{isArchived ? 'Unarchive Chat' : 'Archive Chat'}</Typography>
    </MenuItem>
    {!isGroup && (
      <MenuItem onClick={onContactDetailsClicked}>
        <Typography variant="body2">Contact Details</Typography>
      </MenuItem>
    )}
    {isGroup ? (
      <>
        <MenuItem onClick={onDetailsClicked}>
          <Typography variant="body2">Group Details</Typography>
        </MenuItem>
        <MenuItem onClick={onLeaveClicked}>
          <Typography variant="body2" color="error">
            Leave Group
          </Typography>
        </MenuItem>
      </>
    ) : null}
  </MenuList>
)

export default ChatRoomOptions
