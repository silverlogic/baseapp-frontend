'use client'

import { FC, useEffect } from 'react'

import { AvatarWithPlaceholder } from '@baseapp-frontend/design-system/components/web/avatars'

import { ListItemButton, Typography } from '@mui/material'
import { useFragment } from 'react-relay'

import { ProfileItemFragment$key } from '../../../../../__generated__/ProfileItemFragment.graphql'
import { ProfileItemFragment } from '../../../../profiles/common'
import { ProfileCardProps } from './types'

const ProfileCard: FC<ProfileCardProps> = ({ groupMember, isSelected, tagUser, setName }) => {
  const { id, image, name } = useFragment<ProfileItemFragment$key>(
    ProfileItemFragment,
    groupMember.profile!,
  )
  useEffect(() => {
    if (isSelected) {
      setName(name)
    }
  }, [isSelected, name, setName])
  return (
    <ListItemButton
      key={`profile-card-${id}`}
      selected={isSelected}
      onClick={() => {
        tagUser()
      }}
      sx={{ gap: 1, p: 1 }}
    >
      <AvatarWithPlaceholder
        width={24}
        height={24}
        src={image?.url}
        sx={{ alignSelf: 'center', justifySelf: 'center' }}
      />
      <Typography variant="body2">{name}</Typography>
    </ListItemButton>
  )
}

export default ProfileCard
