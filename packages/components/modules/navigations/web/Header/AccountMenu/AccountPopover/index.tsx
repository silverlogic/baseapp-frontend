'use client'

import { FC, useEffect, useState } from 'react'

import { useCurrentProfile } from '@baseapp-frontend/authentication'
import { ClickableAvatar } from '@baseapp-frontend/design-system/components/web/avatars'
import { Popover } from '@baseapp-frontend/design-system/components/web/popovers'
import { usePopover } from '@baseapp-frontend/design-system/hooks/common'

import Divider from '@mui/material/Divider'

// TODO: review importing components directly from another module
import {
  AddProfileMenuItem as DefaultAddProfileMenuItem,
  CurrentProfile as DefaultCurrentProfile,
  ProfilesList as DefaultProfilesList,
  SwitchProfileMenu as DefaultSwitchProfileMenu,
} from '../../../../../profiles/web'
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
  const { currentProfile: profile } = useCurrentProfile({ noSSR: false })
  const popover = usePopover()

  const [openProfilesList, setOpenProfilesList] = useState(false)

  let timeoutId: NodeJS.Timeout | null = null

  const handlePopoverOnClose = () => {
    popover.onClose()
    // If the profiles list is open, close it after the close animation.
    if (openProfilesList) {
      timeoutId = setTimeout(() => {
        setOpenProfilesList(false)
      }, 500)
    }
  }

  useEffect(
    () => () => {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
    },
    [timeoutId],
  )

  const loadCurrentProfile = !!CurrentProfile && !!profile
  const loadCurrentUser = !loadCurrentProfile && !!CurrentUser

  return (
    <>
      <ClickableAvatar
        color="secondary"
        src={profile?.image ?? ''}
        alt="User avatar"
        onClick={popover.onOpen}
        isOpen={!!popover.open}
      />

      <Popover
        open={popover.open}
        onClose={handlePopoverOnClose}
        sx={{ ...DefaultPopoverStyles, ...PopoverStyles }}
      >
        {!!ProfilesList && openProfilesList ? (
          <ProfilesList
            openSubmenu={openProfilesList}
            handleCloseSubmenu={() => setOpenProfilesList(false)}
            {...ProfilesListProps}
          />
        ) : (
          <>
            {loadCurrentProfile && <CurrentProfile />}

            {loadCurrentUser && <CurrentUser />}

            {loadCurrentProfile && !!SwitchProfileMenu && (
              <SwitchProfileMenu
                openProfilesList={() => setOpenProfilesList(true)}
                {...SwitchProfileMenuProps}
              />
            )}

            {!!MenuItems && !!MenuItemsProps?.menuItems?.length && (
              <>
                {!!(loadCurrentProfile || loadCurrentUser || !!SwitchProfileMenu) && (
                  <Divider sx={{ borderStyle: 'solid' }} />
                )}

                <MenuItems handlePopoverOnClose={handlePopoverOnClose} {...MenuItemsProps} />
              </>
            )}
          </>
        )}

        {!!LogoutItem && <Divider sx={{ borderStyle: 'solid' }} />}

        <LogoutItem handlePopoverOnClose={handlePopoverOnClose} {...LogoutItemProps}>
          {openProfilesList && !!AddProfileMenuItem && (
            <AddProfileMenuItem {...AddProfileMenuItemProps} />
          )}
        </LogoutItem>
      </Popover>
    </>
  )
}

export default AccountPopover
