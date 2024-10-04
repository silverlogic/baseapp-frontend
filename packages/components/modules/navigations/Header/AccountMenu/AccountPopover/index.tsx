'use client'

import { FC, useEffect, useState } from 'react'

import { User as BaseUser, useJWTUser, useLogout } from '@baseapp-frontend/authentication'
import { ChevronIcon, ClickableAvatar, Popover, usePopover } from '@baseapp-frontend/design-system'
import { JWTContent, joinWithSeparator } from '@baseapp-frontend/utils'

import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

import { ProfilesSubmenusList } from '../../../../profiles'
import { PopoverStyles } from './styled'
import { AccountPopoverProps } from './types'

const AccountPopover: FC<AccountPopoverProps> = ({
  menuItems = [],
  logoutButtonLabel = 'Logout',
  switchProfileLabel = 'Switch Profile',
  hideLogoutButton = false,
}) => {
  const { user } = useJWTUser<BaseUser & JWTContent>()
  const { logout } = useLogout()
  const popover = usePopover()

  const [openProfilesSubmenus, setOpenProfilesSubmenus] = useState(false)

  const handleLogout = async () => {
    popover.onClose()
    logout()
  }

  const handleMenuItemClick = (onClick: () => void) => {
    onClick()
    popover.onClose()
  }

  useEffect(() => {
    if (!popover.open && openProfilesSubmenus) {
      setTimeout(() => {
        setOpenProfilesSubmenus(false)
      }, 500) // Popover close transaction timeout
    }
  }, [popover.open, openProfilesSubmenus])

  console.log('debug:user', user)

  return (
    <>
      <ClickableAvatar
        src={user?.avatar?.small}
        alt={user?.email}
        onClick={popover.onOpen}
        isOpen={Boolean(popover.open)}
      >
        {user?.firstName && user?.lastName ? `${user?.firstName[0]}${user?.lastName[0]}` : ''}
      </ClickableAvatar>

      <Popover open={popover.open} onClose={popover.onClose} sx={{ ...PopoverStyles }}>
        <Box display={openProfilesSubmenus ? 'none' : undefined}>
          <Box sx={{ p: 2, pb: 1.5 }}>
            <Typography variant="subtitle2" noWrap>
              {joinWithSeparator([user?.firstName, user?.lastName])}
            </Typography>

            <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
              {user?.email}
            </Typography>
          </Box>

          {/* TODO: check if profile is active. */}
          <Stack sx={{ p: 1 }}>
            <MenuItem
              sx={{ justifyContent: 'space-between' }}
              onClick={() => setOpenProfilesSubmenus(true)}
            >
              {switchProfileLabel}
              <ChevronIcon position="right" />
            </MenuItem>
          </Stack>

          <Divider sx={{ borderStyle: 'solid' }} />

          <Stack sx={{ p: 1 }}>
            {menuItems?.map((item) => (
              <MenuItem key={item.label} onClick={() => handleMenuItemClick(item.onClick)}>
                {item.label}
              </MenuItem>
            ))}
          </Stack>
        </Box>

        {/* TODO: check if profile is active. */}
        {openProfilesSubmenus && (
          <ProfilesSubmenusList
            openSubmenu={openProfilesSubmenus}
            handleCloseSubmenu={() => setOpenProfilesSubmenus(false)}
          />
        )}

        {!hideLogoutButton && (
          <>
            <Divider sx={{ borderStyle: 'solid' }} />

            {/* TODO: check if profile is active. */}
            {openProfilesSubmenus && (
              <MenuItem
                sx={{ m: 1, justifyContent: 'space-between' }}
                onClick={() => console.log('Organization added')} // TODO: Add organization handler.
              >
                New organization
                {/* // TODO: new organization spike. */}
                {/* // TODO: add right icon. */}
              </MenuItem>
            )}

            {!hideLogoutButton && (
              <MenuItem
                onClick={handleLogout}
                sx={{ m: 1, fontWeight: 'fontWeightBold', color: 'error.main' }}
              >
                {logoutButtonLabel}
              </MenuItem>
            )}
          </>
        )}
      </Popover>
    </>
  )
}

export default AccountPopover
