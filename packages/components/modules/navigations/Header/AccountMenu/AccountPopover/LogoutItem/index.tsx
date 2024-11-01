import { FC } from 'react'

import { useLogout } from '@baseapp-frontend/authentication'

import { ButtonBase, MenuItem } from '@mui/material'

import { PopoverContentBox } from '../styled'
import { LogoutItemProps } from './types'

const LogoutItem: FC<LogoutItemProps> = ({
  children,
  handlePopoverOnClose,
  logoutButtonLabel = 'logout',
}) => {
  const { logout } = useLogout()

  return (
    <PopoverContentBox display="flex" flexDirection="column" gap={0.5}>
      {children}
      <MenuItem
        type="button"
        tabIndex={0}
        component={ButtonBase}
        onClick={() => {
          handlePopoverOnClose()
          logout()
        }}
        sx={{ fontWeight: 'fontWeightBold', color: 'error.main' }}
      >
        {logoutButtonLabel}
      </MenuItem>
    </PopoverContentBox>
  )
}

export default LogoutItem
