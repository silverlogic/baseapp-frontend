'use client'

import { FC, useEffect, useMemo, useRef, useState } from 'react'

import { useCurrentProfile, useJWTUser } from '@baseapp-frontend/authentication'
import { AvatarWithPlaceholder } from '@baseapp-frontend/design-system/components/web/avatars'
import { Iconify } from '@baseapp-frontend/design-system/components/web/images'
import { Popover } from '@baseapp-frontend/design-system/components/web/popovers'
import { usePopover } from '@baseapp-frontend/design-system/hooks/common'
import { useUISettings } from '@baseapp-frontend/design-system/hooks/web'
import { joinWithSeparator } from '@baseapp-frontend/utils'

import { Box, Divider, Typography } from '@mui/material'

import {
  AddProfileMenuItem as DefaultAddProfileMenuItem,
  CurrentProfile as DefaultCurrentProfile,
  ProfilesList as DefaultProfilesList,
  SwitchProfileMenu as DefaultSwitchProfileMenu,
} from '../../../../../profiles/web'
import CurrentProfileMenu from '../AccountPopover/CurrentProfileMenu'
import DefaultCurrentUser from '../AccountPopover/CurrentUser'
import LogoutItem from '../AccountPopover/LogoutItem'
import DefaultMenuItems from '../AccountPopover/MenuItems'
import { PopoverStyles as DefaultPopoverStyles } from '../AccountPopover/styled'
import { ARROW_ICON_SIZE, AVATAR_SIZE, PROFILE_LIST_CLOSE_DELAY } from './constants'
import { StyledFooterButtonDefault, StyledFooterButtonMini } from './styled'
import { VerticalFooterProps } from './types'

const VerticalFooter: FC<VerticalFooterProps> = ({ AccountPopoverProps = {} }) => {
  const { currentProfile: profile } = useCurrentProfile()
  const { user } = useJWTUser()
  const popover = usePopover()
  const { settings } = useUISettings()
  const [openProfilesList, setOpenProfilesList] = useState(false)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const isNavMini = useMemo(() => settings.themeLayout === 'mini', [settings.themeLayout])

  const handlePopoverOnClose = () => {
    popover.onClose()
    if (openProfilesList) {
      timeoutRef.current = setTimeout(() => {
        setOpenProfilesList(false)
      }, PROFILE_LIST_CLOSE_DELAY)
    }
  }

  useEffect(
    () => () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    },
    [],
  )

  const {
    PopoverStyles = {},
    MenuItems = DefaultMenuItems,
    MenuItemsProps = {},
    CurrentUser = DefaultCurrentUser,
    CurrentProfile = DefaultCurrentProfile,
    SwitchProfileMenu = DefaultSwitchProfileMenu,
    SwitchProfileMenuProps = {},
    ProfilesList = DefaultProfilesList,
    ProfilesListProps = {},
    AddProfileMenuItem = DefaultAddProfileMenuItem,
    AddProfileMenuItemProps = {},
    LogoutItemProps = {},
  } = AccountPopoverProps

  const profileName = useMemo(() => profile?.name || '', [profile?.name])
  const userName = useMemo(
    () => (user ? joinWithSeparator([user?.firstName, user?.lastName]) : ''),
    [user],
  )

  const FooterButton = isNavMini ? StyledFooterButtonMini : StyledFooterButtonDefault

  if (!user && !profile) {
    return null
  }

  return (
    <>
      <FooterButton onClick={popover.onOpen}>
        <Box
          sx={{
            position: 'relative',
            flexShrink: 0,
          }}
        >
          <AvatarWithPlaceholder
            width={AVATAR_SIZE}
            height={AVATAR_SIZE}
            src={profile?.image ?? ''}
            alt="Profile avatar"
            color="secondary"
            sx={{
              border: (theme) => `2px solid ${theme.palette.divider}`,
              borderRadius: '50%',
            }}
          />
        </Box>
        <Box
          sx={{
            flexGrow: 1,
            minWidth: 0,
            display: 'flex',
            flexDirection: 'column',
            gap: 0,
          }}
        >
          {profileName && (
            <Typography
              component="p"
              variant="subtitle2"
              color="text.primary"
              noWrap
              sx={{
                fontWeight: 590,
                lineHeight: 1.571,
              }}
            >
              {profileName}
            </Typography>
          )}
          {userName && (
            <Typography
              variant="body2"
              color="text.secondary"
              noWrap
              sx={{
                lineHeight: 1.571,
              }}
            >
              {userName}
            </Typography>
          )}
        </Box>
        {!isNavMini && (
          <Box
            sx={{
              flexShrink: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: ARROW_ICON_SIZE,
              height: ARROW_ICON_SIZE,
              color: 'text.secondary',
            }}
          >
            <Iconify icon="eva:arrow-ios-forward-fill" width={ARROW_ICON_SIZE} />
          </Box>
        )}
      </FooterButton>
      <Popover
        open={popover.open}
        onClose={handlePopoverOnClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        hiddenArrow
        sx={{ ...DefaultPopoverStyles, ...PopoverStyles }}
      >
        {!!ProfilesList && openProfilesList ? (
          <ProfilesList
            openSubmenu={openProfilesList}
            handleCloseSubmenu={() => setOpenProfilesList(false)}
            {...ProfilesListProps}
          />
        ) : (
          <CurrentProfileMenu
            CurrentUser={CurrentUser}
            CurrentProfile={CurrentProfile}
            SwitchProfileMenu={SwitchProfileMenu}
            SwitchProfileMenuProps={SwitchProfileMenuProps}
            MenuItems={MenuItems}
            MenuItemsProps={MenuItemsProps}
            handlePopoverOnClose={handlePopoverOnClose}
            setOpenProfilesList={setOpenProfilesList}
          />
        )}

        {Boolean(LogoutItem) && <Divider sx={{ borderStyle: 'solid' }} />}
        <Box margin={1.5} display="flex" flexDirection="column" gap={0.5}>
          {openProfilesList && Boolean(AddProfileMenuItem) && (
            <DefaultAddProfileMenuItem {...AddProfileMenuItemProps} />
          )}
          <LogoutItem handlePopoverOnClose={handlePopoverOnClose} {...LogoutItemProps} />
        </Box>
      </Popover>
    </>
  )
}

export default VerticalFooter
