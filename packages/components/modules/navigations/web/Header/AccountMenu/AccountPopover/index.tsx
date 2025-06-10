'use client'

import { FC, useEffect, useState } from 'react'

import { useCurrentProfile } from '@baseapp-frontend/authentication'
import { ClickableAvatar } from '@baseapp-frontend/design-system/components/web/avatars'
import { Popover } from '@baseapp-frontend/design-system/components/web/popovers'
import { usePopover } from '@baseapp-frontend/design-system/hooks/common'

import { Box } from '@mui/material'
import Divider from '@mui/material/Divider'

// TODO: review importing components directly from another module
import {
  AddProfileMenuItem as DefaultAddProfileMenuItem,
  CurrentProfile as DefaultCurrentProfile,
  ProfilesList as DefaultProfilesList,
  SwitchProfileMenu as DefaultSwitchProfileMenu,
} from '../../../../../profiles/web'
import CurrentProfileMenu from './CurrentProfileMenu'
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
  const { currentProfile: profile } = useCurrentProfile()

  const popover = usePopover()

  const [openProfilesList, setOpenProfilesList] = useState(false)

  let timeoutId: ReturnType<typeof setTimeout> | null = null

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

export default AccountPopover
