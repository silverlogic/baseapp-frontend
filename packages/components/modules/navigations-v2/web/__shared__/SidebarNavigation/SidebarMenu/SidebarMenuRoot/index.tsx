import { FC } from 'react'

import { useResponsive, useUISettings } from '@baseapp-frontend/design-system/hooks/web'

import { Box, Stack } from '@mui/material'

import { NAV_WIDTH } from '../../../../constants'
import NavigationDrawer from '../../../NavigationDrawer'
import DefaultToggleButton from '../../ToggleButton'
import { SidebarMenuRootProps } from './types'

const SidebarMenuRoot: FC<SidebarMenuRootProps> = ({
  children,
  isDrawerOpen,
  onDrawerToggle,
  ToggleButton = DefaultToggleButton,
  ToggleButtonProps,
  collapsible = true,
  NavigationDrawerProps,
  ContainerProps,
}) => {
  const { settings } = useUISettings()
  const isSidebarCollapsed = settings.collapsedSidebar
  const lgDown = useResponsive('down', 'lg')

  if (lgDown) {
    return (
      <NavigationDrawer open={isDrawerOpen} onClick={onDrawerToggle} {...NavigationDrawerProps}>
        {children}
      </NavigationDrawer>
    )
  }
  console.log('use isSidebarCollapsed to adaptthe components below', isSidebarCollapsed)
  return (
    <Box
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV_WIDTH.VERTICAL },
        display: { xs: 'none', lg: 'flex' },
      }}
    >
      <Stack
        {...ContainerProps}
        sx={{
          height: 1,
          position: 'fixed',
          width: NAV_WIDTH.VERTICAL,
          borderRight: (theme) => `solid 1px ${theme.palette.divider}`,
          paddingX: (theme) => theme.spacing(2),
          ...ContainerProps?.sx,
        }}
      >
        {collapsible && <ToggleButton {...ToggleButtonProps} />}
        {children}
      </Stack>
    </Box>
  )
}

export default SidebarMenuRoot
