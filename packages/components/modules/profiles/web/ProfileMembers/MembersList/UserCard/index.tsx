import { FC } from 'react'

import { AvatarWithPlaceholder } from '@baseapp-frontend/design-system/components/web/avatars'
import { CloseIcon } from '@baseapp-frontend/design-system/components/web/icons'

import { IconButton, Typography } from '@mui/material'

import { ProfileItemFragment$key } from '../../../../../../__generated__/ProfileItemFragment.graphql'
import MemberPersonalInfo from '../../MemberPersonalInfo'
import { MEMBER_STATUSES } from '../../constants'
import { MemberCardContainer, MemberPersonalInformation } from '../../styled'
import { UserCardProps } from '../types'

const UserCard: FC<UserCardProps> = ({ user, onRemove, avatarProps = {} }) => {
  if (!user) return null
  if ('isActive' in user)
    return (
      <MemberCardContainer key={user?.id}>
        <MemberPersonalInfo
          member={user?.profile as ProfileItemFragment$key}
          status={user?.isActive ? MEMBER_STATUSES.active : MEMBER_STATUSES.inactive}
          {...avatarProps}
        />
        <IconButton onClick={onRemove}>
          <CloseIcon />
        </IconButton>
      </MemberCardContainer>
    )

  const initials = (user as { email: string })?.email?.split('@')[0]?.slice(0, 2)
  return (
    <MemberCardContainer key={(user as { email: string })?.email}>
      <MemberPersonalInformation isActive={false}>
        <AvatarWithPlaceholder
          width={40}
          height={40}
          alt="Profile avatar"
          color="secondary"
          {...avatarProps}
        >
          {initials?.toUpperCase()}
        </AvatarWithPlaceholder>
        <Typography variant="subtitle2">{(user as { email: string })?.email}</Typography>
      </MemberPersonalInformation>
      <IconButton onClick={onRemove}>
        <CloseIcon />
      </IconButton>
    </MemberCardContainer>
  )
}

export default UserCard
