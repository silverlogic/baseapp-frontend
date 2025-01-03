'use client'

import { FC } from 'react'

import {
  AvatarWithPlaceholder,
  Popover,
  ThreeDotsIcon,
  usePopover,
} from '@baseapp-frontend/design-system'

import { Box, IconButton, Typography } from '@mui/material'
import { useFragment } from 'react-relay'

import { ProfileItemFragment } from '../../../profiles/graphql/queries/ProfileItem'
import AdminOptionsMenu from './AdminOptionsMenu'
import { MainContainer } from './styled'
import { ProfileCardProps } from './types'

const ProfileCard: FC<ProfileCardProps> = ({ hasAdminPermissions, profile: profileRef, role }) => {
  const { id, image, name, urlPath } = useFragment(ProfileItemFragment, profileRef)
  const showUrlPath = !!urlPath?.path
  const showAdminLabel = role === 'ADMIN'
  const showMenu = hasAdminPermissions

  const popover = usePopover()

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
            {showAdminLabel && 'Admin'}
          </Typography>
        </Box>
      </Box>
      {showMenu ? (
        <Box>
          <IconButton onClick={popover.onOpen} aria-label="Show admin options">
            <ThreeDotsIcon sx={{ fontSize: '24px' }} />
          </IconButton>
          <Popover open={popover.open} onClose={popover.onClose}>
            <AdminOptionsMenu
              onMakeAdminClicked={popover.onClose /* TODO: Add functionality */}
              onRemoveClicked={popover.onClose /* TODO: Add functionality */}
            />
          </Popover>
        </Box>
      ) : (
        <Box />
      )}
    </MainContainer>
  )
}

export default ProfileCard
