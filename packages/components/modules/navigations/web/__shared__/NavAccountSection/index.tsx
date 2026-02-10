import { FC } from 'react'

import Box from '@mui/material/Box'

import { NavAccountSectionProps } from './types'

const NavAccountSection: FC<NavAccountSectionProps> = ({
  AccountMenu,
  AccountMenuProps,
  NotificationsPopover,
  NotificationsPopoverProps,
  currentLayout,
}) => {
  if (!AccountMenu && !NotificationsPopover) return null

  const notificationsPopover = NotificationsPopover ? (
    <NotificationsPopover {...NotificationsPopoverProps} currentLayout={currentLayout} showLabel />
  ) : null

  const additionalComponent = notificationsPopover ?? AccountMenuProps?.additionalComponent

  return (
    <Box sx={{ mt: 'auto', display: 'flex', flexDirection: 'column' }}>
      {AccountMenu ? (
        <AccountMenu {...AccountMenuProps} vertical additionalComponent={additionalComponent} />
      ) : (
        notificationsPopover
      )}
    </Box>
  )
}

export default NavAccountSection
