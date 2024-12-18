import { FC } from 'react'

import { useAllAuthLogout } from '@baseapp-frontend/authentication'

import { Box, ButtonBase, MenuItem } from '@mui/material'

import { LogoutItemProps } from './types'

const LogoutItem: FC<LogoutItemProps> = ({
  children,
  handlePopoverOnClose,
  logoutButtonLabel = 'Logout',
}) => {
  const { logout } = useAllAuthLogout()

  return (
    <Box margin={1.5} display="flex" flexDirection="column" gap={0.5}>
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
    </Box>
  )
}

export default LogoutItem
