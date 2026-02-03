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

  return (
    <Box sx={{ mt: 'auto', display: 'flex', flexDirection: 'column' }}>
      {AccountMenu ? (
        <AccountMenu
          {...AccountMenuProps}
          vertical
          additionalComponent={
            NotificationsPopover ? (
              <NotificationsPopover
                {...NotificationsPopoverProps}
                currentLayout={currentLayout}
                showLabel
              />
            ) : (
              AccountMenuProps?.additionalComponent
            )
          }
        />
      ) : (
        NotificationsPopover && (
          <NotificationsPopover
            {...NotificationsPopoverProps}
            currentLayout={currentLayout}
            showLabel
          />
        )
      )}
    </Box>
  )
}

export default NavAccountSection
