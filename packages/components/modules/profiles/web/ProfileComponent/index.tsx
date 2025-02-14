'use client'

import { FC, useState } from 'react'

import { AvatarWithPlaceholder } from '@baseapp-frontend/design-system/components/web/avatars'
import { SwipeableDrawer } from '@baseapp-frontend/design-system/components/web/drawers'
import {
  OutlinedEditIcon,
  ShareIcon,
  ThreeDotsIcon,
} from '@baseapp-frontend/design-system/components/web/icons'
import { ImageWithFallback } from '@baseapp-frontend/design-system/components/web/images'
import { useResponsive } from '@baseapp-frontend/design-system/hooks/web'
import { useNotification } from '@baseapp-frontend/utils'

import { Button, MenuItem, Typography } from '@mui/material'
import { useRouter } from 'next/navigation'
import numbro from 'numbro'
import { useFragment } from 'react-relay'

import { ProfileComponentFragment } from '../../common'
import BlockButtonWithDialog from './BlockButtonWithDialog'
import FollowToggleButton from './FollowToggleButton'
import ReportButtonWithDialog from './ReportButtonWithDialog'
import {
  ProfileContainer,
  ProfileContentContainer,
  ProfileDescriptionContainer,
  ProfileNameContainer,
  StyledMenu,
} from './styled'
import { ProfileComponentProps } from './types'

const ProfileComponent: FC<ProfileComponentProps> = ({ profile: profileRef, currentProfileId }) => {
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

  const formatFollowCount = (count?: number | null) => {
    if (!count || count === 0) {
      return 0
    }
    if (count <= 1000) {
      return count
    }
    if (count < 1050000) {
      return numbro(count).format({ average: true })
    }
    return numbro(count).format({ average: true, mantissa: 1 })
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
      <div className="flex flex-row gap-2">
        {!profile?.isBlockedByMe && (
          <FollowToggleButton
            targetId={profile?.id}
            isFollowedByMe={profile?.isFollowedByMe}
            currentProfileId={currentProfileId}
            profileRef={profile}
          />
        )}
        {profile?.isBlockedByMe && (
          <BlockButtonWithDialog
            target={profile}
            handleCloseMenu={handleClose}
            currentProfileId={currentProfileId}
          />
        )}
      </div>
    )
  }

  const menuOptions = (
    <>
      <MenuItem onClick={handleShareClick} disableRipple>
        <ShareIcon />
        Share profile
      </MenuItem>
      {profile && (
        <BlockButtonWithDialog
          target={profile}
          handleCloseMenu={handleClose}
          currentProfileId={currentProfileId}
          isMenu
        />
      )}
      {profile && (
        <ReportButtonWithDialog handleClose={handleClose} currentProfileId={currentProfileId} />
      )}
    </>
  )

  return (
    <div className="flex h-full w-full justify-center">
      <ProfileContainer>
        <ImageWithFallback
          src={profile?.bannerImage?.url ?? ''}
          fallbackSrc="/png/profile-banner-fallback.png"
          alt="Home Banner"
          width={868}
          height={
            290 /* Some css height: auto takes precedence, 
            so also set as style below */
          }
          className="overflow-hidden rounded-lg"
          style={{ height: '290px', objectFit: 'cover' }}
        />
        <ProfileContentContainer>
          <AvatarWithPlaceholder
            className="self-start justify-self-center"
            width={96}
            height={96}
            src={profile?.image?.url}
          />
          <ProfileDescriptionContainer>
            <ProfileNameContainer>
              <div className="justify-self-start sm:col-span-full sm:justify-self-center">
                <Typography component="h6" variant="h6">
                  {profile?.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {profile?.urlPath?.path ? `@${profile.urlPath.path}` : ''}
                </Typography>
              </div>
              <div className="flex w-full justify-self-stretch">
                <div className="flex-grow border-r border-dashed border-divider text-center sm:w-full">
                  <Typography component="h6" variant="h6">
                    {formatFollowCount(profile?.followersCount)}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Followers
                  </Typography>
                </div>
                <div className="flex-grow text-center sm:w-full">
                  <Typography component="h6" variant="h6">
                    {formatFollowCount(profile?.followingCount)}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Following
                  </Typography>
                </div>
              </div>
            </ProfileNameContainer>
            <p className="prose-caption text-text-secondary">{profile?.biography}</p>
          </ProfileDescriptionContainer>
          <div className="grid grid-cols-[auto_min-content] gap-3 min-sm:col-start-2 min-sm:grid-cols-[fit-content_min-content] min-sm:justify-end">
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
          </div>
        </ProfileContentContainer>
      </ProfileContainer>
    </div>
  )
}

export default ProfileComponent
