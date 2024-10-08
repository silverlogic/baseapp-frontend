'use client'

import { FC, useEffect, useState } from 'react'

import { useLogout } from '@baseapp-frontend/authentication'
import { AddIcon, ChevronIcon, Popover, usePopover } from '@baseapp-frontend/design-system'

import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

import { ProfilesSubmenusList } from '../../../../profiles'
import useUserOrProfile from '../../../hooks/useUserOrProfile'
import AccountAvatar from '../AccountAvatar'
import { PopoverStyles } from './styled'
import { AccountPopoverProps } from './types'

const AccountPopover: FC<AccountPopoverProps> = ({
  menuItems = [],
  logoutButtonLabel = 'Logout',
  switchProfileLabel = 'Switch Profile',
  addNewProfileLabel = 'New profile',
  hideLogoutButton = false,
}) => {
  const { logout } = useLogout()
  const popover = usePopover()
  const userOrProfile = useUserOrProfile()

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

  return (
    <>
      <AccountAvatar
        userOrProfile={userOrProfile}
        popoverOpen={Boolean(popover.open)}
        popoverOnOpen={popover.onOpen}
      />

      <Popover open={popover.open} onClose={popover.onClose} sx={{ ...PopoverStyles }}>
        <Box display={openProfilesSubmenus ? 'none' : undefined}>
          <Box sx={{ p: 2, pb: 1.5, gap: 1.5 }} display="flex" alignItems="center">
            <AccountAvatar
              userOrProfile={userOrProfile}
              popoverOpen={Boolean(popover.open)}
              popoverOnOpen={popover.onOpen}
            />
            <Box display="flex" flexDirection="column" flexGrow={1} overflow="hidden">
              <Typography variant="subtitle2" noWrap>
                {userOrProfile?.name}
              </Typography>

              {userOrProfile?.handle && (
                <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
                  {userOrProfile?.handle}
                </Typography>
              )}
            </Box>
          </Box>

          {/* TODO: check if profile is active. */}
          <Stack sx={{ p: 1 }}>
            <MenuItem
              sx={{ justifyContent: 'space-between' }}
              onClick={() => setOpenProfilesSubmenus(true)}
            >
              {switchProfileLabel}
              <ChevronIcon position="right" color="action" />
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
              <MenuItem sx={{ m: 1, justifyContent: 'space-between' }}>
                {addNewProfileLabel}
                <AddIcon color="action" />
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
