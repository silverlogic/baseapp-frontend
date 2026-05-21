import { FC } from 'react'

import { MenuItem, MenuList, Typography } from '@mui/material'

import { CHAT_ROOM_OPTION_VALUES } from './constants'
import type { ChatRoomOptionValue } from './constants'
import { ChatRoomOptionsProps } from './types'
import { getVisibleOptions } from './utils'

const ChatRoomOptions: FC<ChatRoomOptionsProps> = ({
  isArchived,
  isArchiveMutationInFlight,
  isGroup,
  onArchiveClicked,
  onDetailsClicked,
  onLeaveClicked,
  onContactDetailsClicked,
  hiddenOptions = [],
}) => {
  const visibleOptions = getVisibleOptions({ hiddenOptions, isGroup })

  const renderOption = (value: ChatRoomOptionValue) => {
    switch (value) {
      case CHAT_ROOM_OPTION_VALUES.archive:
        return (
          <MenuItem key={value} onClick={onArchiveClicked} disabled={isArchiveMutationInFlight}>
            <Typography variant="body2">
              {isArchived ? 'Unarchive Chat' : 'Archive Chat'}
            </Typography>
          </MenuItem>
        )
      case CHAT_ROOM_OPTION_VALUES.groupDetails:
        return (
          <MenuItem key={value} onClick={onDetailsClicked}>
            <Typography variant="body2">Group Details</Typography>
          </MenuItem>
        )
      case CHAT_ROOM_OPTION_VALUES.leaveGroup:
        return (
          <MenuItem key={value} onClick={onLeaveClicked}>
            <Typography variant="body2" color="error">
              Leave Group
            </Typography>
          </MenuItem>
        )
      case CHAT_ROOM_OPTION_VALUES.contactDetails:
        return (
          <MenuItem key={value} onClick={onContactDetailsClicked}>
            <Typography variant="body2">Contact Details</Typography>
          </MenuItem>
        )
      default:
        return null
    }
  }

  return <MenuList>{visibleOptions.map(renderOption)}</MenuList>
}

export default ChatRoomOptions
