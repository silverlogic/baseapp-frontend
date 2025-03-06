import { FC } from 'react'

import { useLogout } from '@baseapp-frontend/authentication'

import { ButtonBase, MenuItem } from '@mui/material'

import { LogoutItemProps } from './types'

const LogoutItem: FC<LogoutItemProps> = ({
  handlePopoverOnClose,
  logoutButtonLabel = 'Logout',
}) => {
  const { logout } = useLogout()

  return (
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
  )
}

export default LogoutItem
