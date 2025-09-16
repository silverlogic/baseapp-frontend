import { FC } from 'react'

import { AvatarWithPlaceholder } from '@baseapp-frontend/design-system/components/web/avatars'

import { Box, Typography } from '@mui/material'
import { useFragment } from 'react-relay'

import { ProfileItemFragment$key } from '../../../../../__generated__/ProfileItemFragment.graphql'
import { ProfileItemFragment } from '../../../common'
import { MEMBER_STATUSES } from '../constants'
import { MemberPersonalInformation } from '../styled'
import { MemberPersonalInfoProps } from '../types'

const MemberPersonalInfo: FC<MemberPersonalInfoProps> = ({
  avatarProps = {},
  avatarWidth = 40,
  avatarHeight = 40,
  member,
  status,
  children,
}) => {
  const memberProfile = useFragment<ProfileItemFragment$key>(ProfileItemFragment, member)
  return (
    <MemberPersonalInformation isActive={status === MEMBER_STATUSES.active || false}>
      <AvatarWithPlaceholder
        width={avatarWidth}
        height={avatarHeight}
        src={memberProfile?.image?.url ?? ''}
        alt="Profile avatar"
        color="secondary"
        {...avatarProps}
      >
        {memberProfile?.image?.url ? '' : memberProfile?.name?.slice(0, 2)?.toUpperCase()}
      </AvatarWithPlaceholder>
      <Box>
        <Typography variant="subtitle2">{memberProfile?.name}</Typography>
        <Typography variant="caption">{memberProfile?.urlPath?.path}</Typography>
      </Box>
      {children}
    </MemberPersonalInformation>
  )
}

export default MemberPersonalInfo
