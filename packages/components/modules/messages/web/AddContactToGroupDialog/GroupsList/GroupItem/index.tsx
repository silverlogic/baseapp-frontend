'use client'

import { FC } from 'react'

import { AvatarWithPlaceholder } from '@baseapp-frontend/design-system/components/web/avatars'

import { Box, Checkbox, Typography } from '@mui/material'
import { useFragment } from 'react-relay'

import { AddContactToGroupItemFragment, getParticipantCountString } from '../../../../common'
import { MainContainer } from './styled'
import { GroupItemProps } from './types'

const GroupItem: FC<GroupItemProps> = ({ roomRef, selected, onToggle }) => {
  const node = useFragment(AddContactToGroupItemFragment, roomRef)

  const isAlreadyMember = !!node.isParticipant
  const isChecked = isAlreadyMember || selected

  const handleToggle = () => {
    if (!isAlreadyMember) onToggle(node.id)
  }

  return (
    <MainContainer disabled={isAlreadyMember} onClick={handleToggle}>
      <AvatarWithPlaceholder
        width={48}
        height={48}
        src={node.image?.url}
        sx={{ alignSelf: 'center', justifySelf: 'center' }}
      />
      <Box sx={{ display: 'grid' }}>
        <Typography variant="subtitle2" color={!isAlreadyMember ? 'text.primary' : 'text.disabled'}>
          {node.title}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {getParticipantCountString(node.participantsCount)}
          {isAlreadyMember && (
            <Typography component="span" variant="caption" color="text.disabled">
              {' • Already added'}
            </Typography>
          )}
        </Typography>
      </Box>
      <Checkbox
        checked={isChecked}
        disabled={isAlreadyMember}
        onChange={handleToggle}
        onClick={(event) => event.stopPropagation()}
        inputProps={{ 'aria-label': `select group ${node.title}` }}
      />
    </MainContainer>
  )
}

export default GroupItem
