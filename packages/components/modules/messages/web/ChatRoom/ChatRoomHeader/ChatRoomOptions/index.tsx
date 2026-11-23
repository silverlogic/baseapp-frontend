import { FC } from 'react'

import { MenuItem, MenuList, Typography } from '@mui/material'
import { FormattedMessage } from 'react-intl'

import { SHARED_MESSAGES } from '../../../__shared__/constants'
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
      <Typography variant="body2">
        <FormattedMessage
          {...(isArchived ? SHARED_MESSAGES.unarchiveChat : SHARED_MESSAGES.archiveChat)}
        />
      </Typography>
    </MenuItem>
    {isGroup ? (
      <>
        <MenuItem onClick={onDetailsClicked}>
          <Typography variant="body2">
            <FormattedMessage
              id="messages.chatRoom.options.groupDetails"
              defaultMessage="Group Details"
            />
          </Typography>
        </MenuItem>
        <MenuItem onClick={onLeaveClicked}>
          <Typography variant="body2" color="error">
            <FormattedMessage {...SHARED_MESSAGES.leaveGroup} />
          </Typography>
        </MenuItem>
      </>
    ) : (
      <MenuItem onClick={onContactDetailsClicked}>
        <Typography variant="body2">
          <FormattedMessage {...SHARED_MESSAGES.contactDetails} />
        </Typography>
      </MenuItem>
    )}
  </MenuList>
)

export default ChatRoomOptions
