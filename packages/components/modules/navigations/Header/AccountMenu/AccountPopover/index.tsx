'use client'

import { FC, useState } from 'react'

import { User as BaseUser, useJWTUser } from '@baseapp-frontend/authentication'
import { Popover, usePopover } from '@baseapp-frontend/design-system'
import { JWTContent } from '@baseapp-frontend/utils'

import Divider from '@mui/material/Divider'

import {
  AddProfileMenuItem as DefaultAddProfileMenuItem,
  CurrentProfile as DefaultCurrentProfile,
  ProfilesList as DefaultProfilesList,
  SwitchProfileMenu as DefaultSwitchProfileMenu,
  useCurrentProfile,
} from '../../../../profiles'
import AccountAvatar from './AccountAvatar'
import DefaultCurrentUser from './CurrentUser'
import LogoutItem from './LogoutItem'
import MenuItems from './MenuItems'
import { PopoverStyles as DefaultPopoverStyles } from './styled'
import { AccountPopoverProps } from './types'

const AccountPopover: FC<AccountPopoverProps> = ({
  PopoverStyles = {},
  menuItems = [],
  CurrentUser = DefaultCurrentUser,
  CurrentProfile = DefaultCurrentProfile,
  SwitchProfileMenu = DefaultSwitchProfileMenu,
  ProfilesList = DefaultProfilesList,
  AddProfileMenuItem = DefaultAddProfileMenuItem,
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
  const loadMenuItems: boolean = Boolean(menuItems.length)

  return (
    <>
      <AccountAvatar
        src={profile?.image?.url ?? user?.avatar?.small}
        alt="User avatar"
        popoverOpen={Boolean(popover.open)}
        popoverOnOpen={popover.onOpen}
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
          />
        ) : (
          <>
            {loadCurrentProfile && <CurrentProfile />}

            {loadCurrentUser && <CurrentUser />}

            <SwitchProfileMenu openProfilesList={() => setOpenProfilesList(true)} />

            {loadMenuItems && (
              <>
                {Boolean(loadCurrentProfile || loadCurrentUser || Boolean(SwitchProfileMenu)) && (
                  <Divider sx={{ borderStyle: 'solid' }} />
                )}

                <MenuItems menuItems={menuItems} handlePopoverOnClose={handlePopoverOnClose} />
              </>
            )}
          </>
        )}

        {Boolean(LogoutItem) && <Divider sx={{ borderStyle: 'solid' }} />}

        <LogoutItem handlePopoverOnClose={handlePopoverOnClose}>
          {openProfilesList && Boolean(AddProfileMenuItem) && <AddProfileMenuItem />}
        </LogoutItem>
      </Popover>
    </>
  )
}

export default AccountPopover
