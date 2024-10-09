'use client'

import { FC, Fragment } from 'react'

import { User as BaseUser, useJWTUser, useLogout } from '@baseapp-frontend/authentication'
import { Popover, usePopover } from '@baseapp-frontend/design-system'
import { JWTContent } from '@baseapp-frontend/utils'

import { ButtonBase, List } from '@mui/material'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import Stack from '@mui/material/Stack'

import AccountAvatar from '../AccountAvatar'
import CurrentUserPlaceholder from '../CurrentUserPlaceholder'
import { PopoverStyles as DefaultPopoverStyles } from './styled'
import { AccountPopoverProps, ComponentItems } from './types'

const AccountPopover: FC<AccountPopoverProps> = ({
  accountAvatarUrl,
  onCloseCallback,
  menuItems = [],
  PopoverStyles = {},
  accountSection = { show: true, items: [] },
  menuSection = { show: true, items: [] },
  accountActionsSection = { show: true, items: [] },
  extraSections = [],
  logoutButtonLabel = 'Logout',
  disableCurrentUserPlaceholder = false,
  hideLogoutButton = false,
}) => {
  const { user } = useJWTUser<BaseUser & JWTContent>()
  console.log('debug:user', user)
  const { logout } = useLogout()

  const popover = usePopover()

  const handleOnClose = () => {
    if (onCloseCallback) {
      onCloseCallback()
    }
    popover.onClose()
  }

  const handleLogout = async () => {
    handleOnClose()
    logout()
  }

  const handleMenuItemClick = (onClick: () => void) => {
    onClick()
    handleOnClose()
  }

  const renderItems = (items: ComponentItems) =>
    items.map((item, index) => {
      if (!item) {
        return null
      }
      if (typeof item === 'function') {
        const Component = item as FC
        return <Component key={index} /> // eslint-disable-line react/no-array-index-key
      }
      return <Fragment key={index}>{item}</Fragment> // eslint-disable-line react/no-array-index-key
    })

  return (
    <>
      <AccountAvatar
        src={accountAvatarUrl ?? user?.avatar?.small}
        alt="User avatar"
        popoverOpen={Boolean(popover.open)}
        popoverOnOpen={popover.onOpen}
      />

      <Popover
        open={popover.open}
        onClose={handleOnClose}
        sx={{ ...DefaultPopoverStyles, ...PopoverStyles }}
      >
        {accountSection.show && (
          <>
            <Box sx={{ m: 1 }}>
              {!disableCurrentUserPlaceholder && user && <CurrentUserPlaceholder user={user} />}
              {renderItems(accountSection.items)}
            </Box>
            <Divider sx={{ borderStyle: 'solid' }} />
          </>
        )}

        {menuSection.show && (
          <>
            <Box sx={{ m: 1 }}>
              <Stack component={List}>
                {menuItems?.map((item) => (
                  <MenuItem key={item.label} onClick={() => handleMenuItemClick(item.onClick)}>
                    {item.label}
                  </MenuItem>
                ))}
              </Stack>
              {renderItems(menuSection.items)}
            </Box>
            <Divider sx={{ borderStyle: 'solid' }} />
          </>
        )}

        {extraSections.map((section) => {
          if (!section.show) {
            return null
          }
          return (
            <>
              {renderItems(section.items)}
              <Divider sx={{ borderStyle: 'solid' }} />
            </>
          )
        })}

        {accountActionsSection.show && (
          <Box display="flex" flexDirection="column" gap={0.5} sx={{ m: 1 }}>
            {renderItems(accountActionsSection.items)}
            {!hideLogoutButton && (
              <MenuItem
                component={ButtonBase}
                onClick={handleLogout}
                sx={{ fontWeight: 'fontWeightBold', color: 'error.main' }}
              >
                {logoutButtonLabel}
              </MenuItem>
            )}
          </Box>
        )}
      </Popover>
    </>
  )
}

export default AccountPopover
