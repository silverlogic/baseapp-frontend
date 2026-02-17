'use client'

import { FC, useEffect, useState } from 'react'

import { useCurrentProfile } from '@baseapp-frontend/authentication'
import { ClickableAvatar } from '@baseapp-frontend/design-system/components/web/avatars'
import { Popover } from '@baseapp-frontend/design-system/components/web/popovers'
import { usePopover } from '@baseapp-frontend/design-system/hooks/common'

// TODO: review importing components directly from another module
import {
  AddProfileMenuItem as DefaultAddProfileMenuItem,
  CurrentProfile as DefaultCurrentProfile,
  ProfilesList as DefaultProfilesList,
  SwitchProfileMenu as DefaultSwitchProfileMenu,
} from '../../../../../profiles/web'
import PopoverContent from '../__shared__/PopoverContent'
import DefaultCurrentUser from './CurrentUser'
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
        <PopoverContent
          ProfilesList={ProfilesList}
          ProfilesListProps={ProfilesListProps}
          openProfilesList={openProfilesList}
          setOpenProfilesList={setOpenProfilesList}
          CurrentUser={CurrentUser}
          CurrentProfile={CurrentProfile}
          SwitchProfileMenu={SwitchProfileMenu}
          SwitchProfileMenuProps={SwitchProfileMenuProps}
          MenuItems={MenuItems}
          MenuItemsProps={MenuItemsProps}
          handlePopoverOnClose={handlePopoverOnClose}
          AddProfileMenuItem={AddProfileMenuItem}
          AddProfileMenuItemProps={AddProfileMenuItemProps}
          LogoutItemProps={LogoutItemProps}
        />
      </Popover>
    </>
  )
}

export default AccountPopover
