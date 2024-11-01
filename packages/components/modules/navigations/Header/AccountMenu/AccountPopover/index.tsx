'use client'

import { FC, useState } from 'react'

import { User as BaseUser, useJWTUser } from '@baseapp-frontend/authentication'
import { ClickableAvatar, Popover, usePopover } from '@baseapp-frontend/design-system'
import { JWTContent } from '@baseapp-frontend/utils'

import Divider from '@mui/material/Divider'

import {
  AddProfileMenuItem as DefaultAddProfileMenuItem,
  CurrentProfile as DefaultCurrentProfile,
  ProfilesList as DefaultProfilesList,
  SwitchProfileMenu as DefaultSwitchProfileMenu,
  useCurrentProfile,
} from '../../../../profiles'
import DefaultCurrentUser from './CurrentUser'
import LogoutItem from './LogoutItem'
import DefaultMenuItems from './MenuItems'
import { PopoverStyles as DefaultPopoverStyles } from './styled'
import { AccountPopoverProps } from './types'

const AccountPopover: FC<AccountPopoverProps> = ({
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
}) => {
  const { user } = useJWTUser<BaseUser & JWTContent>()
  const { profile } = useCurrentProfile()
  const popover = usePopover()

  const [openProfilesList, setOpenProfilesList] = useState(false)

  const handlePopoverOnClose = () => {
    popover.onClose()
    // If the profiles list is open, close it after the close animation.
    if (openProfilesList) {
      setTimeout(() => {
        setOpenProfilesList(false)
      }, 500)
    }
  }

  const loadCurrentProfile: boolean = Boolean(CurrentProfile) && Boolean(profile)
  const loadCurrentUser: boolean = !loadCurrentProfile && Boolean(CurrentUser)

  return (
    <>
      <ClickableAvatar
        color="secondary"
        src={profile?.image?.url ?? user?.avatar?.small}
        alt="User avatar"
        onClick={popover.onOpen}
        isOpen={Boolean(popover.open)}
      />

      <Popover
        open={popover.open}
        onClose={handlePopoverOnClose}
        sx={{ ...DefaultPopoverStyles, ...PopoverStyles }}
      >
        {openProfilesList ? (
          <ProfilesList
            openSubmenu={openProfilesList}
            handleCloseSubmenu={() => setOpenProfilesList(false)}
            {...ProfilesListProps}
          />
        ) : (
          <>
            {loadCurrentProfile && <CurrentProfile />}

            {loadCurrentUser && <CurrentUser />}

            {loadCurrentProfile && Boolean(SwitchProfileMenu) && (
              <SwitchProfileMenu
                openProfilesList={() => setOpenProfilesList(true)}
                {...SwitchProfileMenuProps}
              />
            )}

            {Boolean(MenuItemsProps?.menuItems?.length) && (
              <>
                {Boolean(loadCurrentProfile || loadCurrentUser || Boolean(SwitchProfileMenu)) && (
                  <Divider sx={{ borderStyle: 'solid' }} />
                )}

                <MenuItems handlePopoverOnClose={handlePopoverOnClose} {...MenuItemsProps} />
              </>
            )}
          </>
        )}

        {Boolean(LogoutItem) && <Divider sx={{ borderStyle: 'solid' }} />}

        <LogoutItem handlePopoverOnClose={handlePopoverOnClose} {...LogoutItemProps}>
          {openProfilesList && Boolean(AddProfileMenuItem) && (
            <AddProfileMenuItem {...AddProfileMenuItemProps} />
          )}
        </LogoutItem>
      </Popover>
    </>
  )
}

export default AccountPopover
