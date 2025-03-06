import { FC } from 'react'

import { useCurrentProfile } from '@baseapp-frontend/authentication'

import { Divider } from '@mui/material'

import {
  CurrentProfile as DefaultCurrentProfile,
  SwitchProfileMenu as DefaultSwitchProfileMenu,
} from '../../../../../../profiles/web'
import DefaultCurrentUser from '../CurrentUser'
import DefaultMenuItems from '../MenuItems'
import { CurrentProfileMenuProps } from './types'

const CurrentProfileMenu: FC<CurrentProfileMenuProps> = ({
  CurrentUser = DefaultCurrentUser,
  CurrentProfile = DefaultCurrentProfile,
  SwitchProfileMenu = DefaultSwitchProfileMenu,
  SwitchProfileMenuProps = {},
  MenuItems = DefaultMenuItems,
  MenuItemsProps = {},
  handlePopoverOnClose,
  setOpenProfilesList,
}) => {
  const { currentProfile: profile } = useCurrentProfile({ noSSR: false })
  const loadCurrentProfile = Boolean(CurrentProfile) && Boolean(profile)
  const loadCurrentUser = !loadCurrentProfile && Boolean(CurrentUser)
  const shouldShowDivider = Boolean(
    loadCurrentProfile || loadCurrentUser || Boolean(SwitchProfileMenu),
  )

  return (
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
          {shouldShowDivider && <Divider sx={{ borderStyle: 'solid' }} />}

          <MenuItems handlePopoverOnClose={handlePopoverOnClose} {...MenuItemsProps} />
        </>
      )}
    </>
  )
}

export default CurrentProfileMenu
