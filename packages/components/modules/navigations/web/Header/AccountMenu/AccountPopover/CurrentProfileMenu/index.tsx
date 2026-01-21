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
  const { currentProfile: profile } = useCurrentProfile()
  const loadCurrentProfile = !!CurrentProfile && !!profile
  const loadCurrentUser = !loadCurrentProfile && !!CurrentUser
  const shouldShowDivider = (loadCurrentProfile || loadCurrentUser) && !!SwitchProfileMenu

  return (
    <>
      {loadCurrentProfile && <CurrentProfile />}

      {loadCurrentUser && <CurrentUser />}

      {loadCurrentProfile && !!SwitchProfileMenu && (
        <SwitchProfileMenu
          openProfilesList={() => setOpenProfilesList(true)}
          {...SwitchProfileMenuProps}
        />
      )}

      {!!MenuItemsProps?.menuItems?.length && (
        <>
          {shouldShowDivider && <Divider sx={{ borderStyle: 'solid' }} />}

          <MenuItems handlePopoverOnClose={handlePopoverOnClose} {...MenuItemsProps} />
        </>
      )}
    </>
  )
}

export default CurrentProfileMenu
