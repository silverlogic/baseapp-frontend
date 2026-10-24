import { FC } from 'react'

import { useLogout } from '@baseapp-frontend/authentication'

import { ButtonBase, MenuItem } from '@mui/material'
import { useIntl } from 'react-intl'

import { LogoutItemProps } from './types'

const LogoutItem: FC<LogoutItemProps> = ({ handlePopoverOnClose, logoutButtonLabel }) => {
  const intl = useIntl()
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
      {logoutButtonLabel ??
        intl.formatMessage({
          id: 'navigations.accountPopover.logout',
          defaultMessage: 'Logout',
        })}
    </MenuItem>
  )
}

export default LogoutItem
