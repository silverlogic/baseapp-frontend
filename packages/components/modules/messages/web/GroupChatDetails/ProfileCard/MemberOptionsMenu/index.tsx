import { FC } from 'react'

import { MenuItem, MenuList, Typography } from '@mui/material'
import { FormattedMessage } from 'react-intl'

import { SHARED_MESSAGES } from '../../../__shared__/constants'
import { MemberOptionsMenuProps } from './types'

const MemberOptionsMenu: FC<MemberOptionsMenuProps> = ({
  isMe,
  onViewProfileClicked,
  onRemoveClicked,
}) => (
  <MenuList>
    <MenuItem onClick={onViewProfileClicked}>
      <Typography variant="body2">
        <FormattedMessage {...SHARED_MESSAGES.seeProfile} />
      </Typography>
    </MenuItem>
    {isMe && (
      <MenuItem onClick={onRemoveClicked}>
        <Typography variant="body2" color="error">
          <FormattedMessage {...SHARED_MESSAGES.leaveGroup} />
        </Typography>
      </MenuItem>
    )}
  </MenuList>
)

export default MemberOptionsMenu
