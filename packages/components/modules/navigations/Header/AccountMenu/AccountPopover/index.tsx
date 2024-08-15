'use client'

import { FC } from 'react'

import { User as BaseUser, useJWTUser, useLogout } from '@baseapp-frontend/authentication'
import { ClickableAvatar, Popover, usePopover } from '@baseapp-frontend/design-system'
import { JWTContent, joinWithSeparator } from '@baseapp-frontend/utils'

import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

import { AccountPopoverProps } from './types'

const AccountPopover: FC<AccountPopoverProps> = ({
  menuItems = [],
  logoutButtonLabel = 'Logout',
  hideLogoutButton = false,
}) => {
  const { user } = useJWTUser<BaseUser & JWTContent>()
  const { logout } = useLogout()
  const popover = usePopover()

  const handleLogout = async () => {
    popover.onClose()
    logout()
  }

  const handleMenuItemClick = (onClick: () => void) => {
    onClick()
    popover.onClose()
  }

  return (
    <>
      <ClickableAvatar
        src={user?.avatar?.small}
        alt={user?.email}
        onClick={popover.onOpen}
        isOpen={!!popover.open}
      >
        {user?.firstName && user?.lastName ? `${user?.firstName[0]}${user?.lastName[0]}` : ''}
      </ClickableAvatar>

      <Popover open={popover.open} onClose={popover.onClose} sx={{ width: 200, p: 0 }}>
        <Box sx={{ p: 2, pb: 1.5 }}>
          <Typography variant="subtitle2" noWrap>
            {joinWithSeparator([user?.firstName, user?.lastName])}
          </Typography>

          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {user?.email}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: 'solid' }} />

        <Stack sx={{ p: 1 }}>
          {menuItems?.map((item) => (
            <MenuItem key={item.label} onClick={() => handleMenuItemClick(item.onClick)}>
              {item.label}
            </MenuItem>
          ))}
        </Stack>

        {!hideLogoutButton && (
          <>
            <Divider sx={{ borderStyle: 'solid' }} />
            <MenuItem
              onClick={handleLogout}
              sx={{ m: 1, fontWeight: 'fontWeightBold', color: 'error.main' }}
            >
              {logoutButtonLabel}
            </MenuItem>
          </>
        )}
      </Popover>
    </>
  )
}

export default AccountPopover
