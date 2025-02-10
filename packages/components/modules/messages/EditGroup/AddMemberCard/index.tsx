'use client'

import { FC } from 'react'

import { AvatarWithPlaceholder } from '@baseapp-frontend/design-system'

import { Box, Checkbox, Typography } from '@mui/material'
import { useFragment } from 'react-relay'

import { ProfileItemFragment } from '../../../profiles/graphql/queries/ProfileItem'
import { MainContainer } from './styled'
import { AddMemberCardProps } from './types'

const AddMemberCard: FC<AddMemberCardProps> = ({
  profile: profileRef,
  handleAddMember,
  handleRemoveMember,
  isBeingAdded = false,
  isExistingMember = false,
}) => {
  const { id, image, name, urlPath } = useFragment(ProfileItemFragment, profileRef)

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = event
    if (target.checked) {
      handleAddMember(profileRef)
    } else {
      handleRemoveMember(profileRef)
    }
  }

  const getCaptionText = () => {
    if (isExistingMember) {
      return 'Already added to the group'
    }
    if (urlPath?.path) {
      return `@${urlPath.path}`
    }
    return ''
  }

  return (
    <MainContainer key={`chat-room-item-${id}`}>
      <AvatarWithPlaceholder
        width={48}
        height={48}
        src={image?.url}
        sx={{ alignSelf: 'center', justifySelf: 'center' }}
      />
      <Box sx={{ display: 'grid', gridTemplateRows: 'repeat(2, minmax(0, 1fr))' }}>
        <Typography
          variant="subtitle2"
          color={!isExistingMember ? 'text.primary' : 'text.disabled'}
        >
          {name}
        </Typography>
        <Typography
          variant="caption"
          color={!isExistingMember ? 'text.secondary' : 'text.disabled'}
          sx={{ fontStyle: !isExistingMember ? 'normal' : 'italic' }}
        >
          {getCaptionText()}
        </Typography>
      </Box>
      {!isExistingMember && <Checkbox checked={isBeingAdded} onChange={handleCheckboxChange} />}
    </MainContainer>
  )
}

export default AddMemberCard
