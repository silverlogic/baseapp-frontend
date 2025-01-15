'use client'

import { FC } from 'react'

import { useCurrentProfile } from '@baseapp-frontend/authentication'
import {
  AvatarWithPlaceholder,
  Popover,
  ThreeDotsIcon,
  usePopover,
} from '@baseapp-frontend/design-system'

import { Box, IconButton, Typography } from '@mui/material'
import { useFragment } from 'react-relay'

import { ProfileItemFragment$key } from '../../../../__generated__/ProfileItemFragment.graphql'
import { ProfileItemFragment } from '../../../profiles/graphql/queries/ProfileItem'
import { ADMIN_LABEL, CHAT_ROOM_PARTICIPANT_ROLES } from '../../__shared__/constants'
import AdminOptionsMenu from './AdminOptionsMenu'
import MemberOptionsMenu from './MemberOptionsMenu'
import { MainContainer } from './styled'
import { ProfileCardProps } from './types'

const ProfileCard: FC<ProfileCardProps> = ({
  hasAdminPermissions,
  groupMember,
  initiateRemoval,
}) => {
  const { id, image, name, urlPath } = useFragment<ProfileItemFragment$key>(
    ProfileItemFragment,
    groupMember.profile!,
  )
  const showUrlPath = !!urlPath?.path
  const showAdminLabel = groupMember?.role === CHAT_ROOM_PARTICIPANT_ROLES.admin
  const showMenu = hasAdminPermissions
  const { currentProfile } = useCurrentProfile()
  const popover = usePopover()
  const isMe = currentProfile?.id === id

  const handleRemoveClicked = () => {
    popover.onClose()
    initiateRemoval(id, name)
  }

  const renderMenuItems = () => {
    if (isMe) {
      return (
        <MemberOptionsMenu
          isMe={isMe}
          onViewProfileClicked={popover.onClose /* TODO: Add functionality */}
          onRemoveClicked={handleRemoveClicked}
        />
      )
    }

    if (!isMe && hasAdminPermissions) {
      return (
        <AdminOptionsMenu
          onViewProfileClicked={popover.onClose /* TODO: Add functionality */}
          onToggleAdminClicked={popover.onClose /* TODO: Add functionality */}
          onRemoveClicked={handleRemoveClicked}
        />
      )
    }

    return (
      <MemberOptionsMenu
        isMe={isMe}
        onViewProfileClicked={popover.onClose /* TODO: Add functionality */}
        onRemoveClicked={handleRemoveClicked}
      />
    )
  }

  return (
    <MainContainer key={`profile-${id}`}>
      <AvatarWithPlaceholder
        width={48}
        height={48}
        src={image?.url}
        sx={{ alignSelf: 'center', justifySelf: 'center' }}
      />
      <Box sx={{ display: 'grid', gridTemplateRows: 'repeat(2, minmax(0, 1fr))' }}>
        <Typography variant="subtitle2">{name}</Typography>
        <Box
          sx={{
            alignItems: 'center',
            display: 'grid',
            gridTemplateColumns: 'min-content min-content min-content',
          }}
        >
          <Typography variant="caption" color="text.secondary">
            {showUrlPath && `@${urlPath.path}`}
          </Typography>
          {showAdminLabel && showUrlPath && (
            <Box
              sx={{
                display: 'inline-block',
                height: '6px',
                width: '6px',
                borderRadius: '50%',
                backgroundColor: 'text.disabled',
                marginX: '8px',
              }}
            />
          )}
          <Typography variant="caption" color="primary.light">
            {showAdminLabel && ADMIN_LABEL}
          </Typography>
        </Box>
      </Box>
      {showMenu ? (
        <Box>
          <IconButton onClick={popover.onOpen} aria-label="Show admin options">
            <ThreeDotsIcon sx={{ fontSize: '24px' }} />
          </IconButton>
          <Popover open={popover.open} onClose={popover.onClose}>
            {renderMenuItems()}
          </Popover>
        </Box>
      ) : (
        <Box />
      )}
    </MainContainer>
  )
}

export default ProfileCard
