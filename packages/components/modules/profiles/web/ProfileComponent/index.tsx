'use client'

import { FC, useState } from 'react'

import { AvatarWithPlaceholder } from '@baseapp-frontend/design-system/components/web/avatars'
import { SwipeableDrawer } from '@baseapp-frontend/design-system/components/web/drawers'
import {
  OutlinedEditIcon,
  ShareIcon,
  ThreeDotsIcon,
} from '@baseapp-frontend/design-system/components/web/icons'
import { useResponsive } from '@baseapp-frontend/design-system/hooks/web'
import { useNotification } from '@baseapp-frontend/utils'

import { Button, Divider, MenuItem, Typography } from '@mui/material'
import { useRouter } from 'next/navigation'
import { useFragment } from 'react-relay'

import { ProfileComponentFragment, formatFollowCount } from '../../common'
import BlockButtonWithDialog from './BlockButtonWithDialog'
import FollowToggleButton from './FollowToggleButton'
import ReportButtonWithDialog from './ReportButtonWithDialog'
import {
  ActionButtonsContainer,
  ActionsContainer,
  Banner,
  Biography,
  CountContainer,
  FollowCountsContainer,
  NameContainer,
  PageContainer,
  ProfileContainer,
  ProfileContentContainer,
  ProfileDescriptionContainer,
  ProfileNameContainer,
  StyledMenu,
} from './styled'
import { ProfileComponentProps } from './types'

const ProfileComponent: FC<ProfileComponentProps> = ({
  profile: profileRef,
  currentProfileId,
  bannerFallback = '/png/profile-banner-fallback.png',
}) => {
  const profile = useFragment(ProfileComponentFragment, profileRef)
  const smDown = useResponsive('down', 'sm')
  const router = useRouter()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  const { sendToast } = useNotification()

  const handleShareClick = () => {
    const path = profile?.urlPath?.path ?? `/profile/${profile?.id}`
    const url = [process.env.NEXT_PUBLIC_APP_BASE_URL, path].join('')
    navigator.clipboard.writeText(url)
    sendToast('Profile URL copied to clipboard!', { type: 'success' })
    handleClose()
  }

  const renderProfileUpdatesButtons = () => {
    if (currentProfileId === profile?.id) {
      return (
        <Button
          variant="soft"
          size="medium"
          color="inherit"
          startIcon={<OutlinedEditIcon />}
          sx={{ maxWidth: smDown ? '100%' : 'fit-content' }}
          onClick={() => router.push('/user/settings')}
        >
          Edit Profile
        </Button>
      )
    }
    return (
      <ActionButtonsContainer>
        {!profile?.isBlockedByMe && (
          <FollowToggleButton targetId={profile?.id} isFollowedByMe={profile?.isFollowedByMe} />
        )}
        {profile?.isBlockedByMe && (
          <BlockButtonWithDialog
            target={profile}
            handleCloseMenu={handleClose}
            currentProfileId={currentProfileId}
          />
        )}
      </ActionButtonsContainer>
    )
  }

  const menuOptions = [
    <MenuItem key="share" onClick={handleShareClick} disableRipple>
      <ShareIcon />
      Share profile
    </MenuItem>,
    smDown && <Divider key="divider" />,
    profile && currentProfileId !== profile?.id && (
      <BlockButtonWithDialog
        key="block"
        target={profile}
        handleCloseMenu={handleClose}
        currentProfileId={currentProfileId}
        isMenu
      />
    ),
    profile && currentProfileId !== profile?.id && (
      <ReportButtonWithDialog key="report" handleClose={handleClose} targetId={profile?.id} />
    ),
  ].filter(Boolean)

  const bannerSrc = profile?.bannerImage?.url || bannerFallback

  return (
    <PageContainer>
      <ProfileContainer>
        <Banner
          src={bannerSrc}
          fallbackSrc={bannerFallback}
          alt="Home Banner"
          width={868}
          height={
            290 /* Some css height: auto takes precedence,
            so also set as style below */
          }
          style={{ height: '290px', objectFit: 'cover' }}
        />
        <ProfileContentContainer>
          <AvatarWithPlaceholder
            sx={{ alignSelf: 'start', justifySelf: 'center' }}
            width={96}
            height={96}
            src={profile?.image?.url}
          />
          <ProfileDescriptionContainer>
            <ProfileNameContainer>
              <NameContainer>
                <Typography component="h6" variant="h6">
                  {profile?.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {profile?.urlPath?.path ? `@${profile.urlPath.path}` : ''}
                </Typography>
              </NameContainer>
              <FollowCountsContainer>
                <CountContainer withDivider>
                  <Typography component="h6" variant="h6">
                    {formatFollowCount(profile?.followersCount)}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Followers
                  </Typography>
                </CountContainer>
                <CountContainer>
                  <Typography component="h6" variant="h6">
                    {formatFollowCount(profile?.followingCount)}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Following
                  </Typography>
                </CountContainer>
              </FollowCountsContainer>
            </ProfileNameContainer>
            <Biography>{profile?.biography}</Biography>
          </ProfileDescriptionContainer>
          <ActionsContainer>
            {renderProfileUpdatesButtons()}
            <Button
              color="inherit"
              variant="soft"
              sx={{ maxWidth: 'fit-content', minWidth: 'max-content' }}
              onClick={handleClick}
            >
              <ThreeDotsIcon />
            </Button>
            {!smDown && (
              <StyledMenu anchorEl={anchorEl} open={open} onClose={handleClose}>
                {menuOptions}
              </StyledMenu>
            )}
            {smDown && (
              <SwipeableDrawer anchor="bottom" open={open} onClose={handleClose}>
                {menuOptions}
              </SwipeableDrawer>
            )}
          </ActionsContainer>
        </ProfileContentContainer>
      </ProfileContainer>
    </PageContainer>
  )
}

export default ProfileComponent
