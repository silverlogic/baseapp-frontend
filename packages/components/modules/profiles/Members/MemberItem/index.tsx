import { FC } from 'react'

import { AvatarWithPlaceholder } from '@baseapp-frontend/design-system'

import { Box, Button, Typography } from '@mui/material'
import { readInlineData } from 'react-relay'

import { ProfileItemFragment$key } from '../../../../__generated__/ProfileItemFragment.graphql'
import { ProfileItemFragment } from '../../graphql/queries/ProfileItem'
import { MemberStatuses } from '../constants'
import { MemberItemContainer, MemberPersonalInformation } from './styled'
import { MemberItemProps } from './types'

const MemberItem: FC<MemberItemProps> = ({
  member,
  memberRole,
  status,
  avatarProps = {},
  avatarWidth = 40,
  avatarHeight = 40,
}) => {
  if (!member) return null
  const memberProfile = readInlineData<ProfileItemFragment$key>(ProfileItemFragment, member)
  return (
    <MemberItemContainer>
      <MemberPersonalInformation isActive={status === MemberStatuses.active || false}>
        <AvatarWithPlaceholder
          width={avatarWidth}
          height={avatarHeight}
          src={memberProfile?.image?.url ?? ''}
          alt="Profile avatar"
          color="secondary"
          {...avatarProps}
        />
        <Box>
          <Typography variant="subtitle2">{memberProfile.name}</Typography>
          <Typography variant="caption">{memberProfile?.urlPath?.path}</Typography>
        </Box>
      </MemberPersonalInformation>

      <Box sx={{ textTransform: 'lowercase' }}>
        <Button variant="soft" color="inherit">
          {status === MemberStatuses.active ? memberRole : status}
        </Button>
      </Box>
    </MemberItemContainer>
  )
}

export default MemberItem
