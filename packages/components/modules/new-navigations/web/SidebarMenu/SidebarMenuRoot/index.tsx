import { FC } from 'react'

import { useResponsive } from '@baseapp-frontend/design-system/hooks/web'

import { Box, Drawer, Stack } from '@mui/material'

import { NAV_WIDTH } from '../../../../navigations/web/constants'
import NavToggleButton from '../ToggleButton'
import { SidebarMenuRootProps } from './types'

const SidebarMenuRoot: FC<SidebarMenuRootProps> = ({
  children,
  PaperProps,
  open,
  onClose,
  ToggleButton = NavToggleButton,
  ToggleButtonProps,
  collapsible = true,
  DrawerProps,
  ContainerProps,
  ...props
}) => {
  const lgDown = useResponsive('down', 'lg')

  if (lgDown) {
    return (
      <Drawer
        open={open}
        onClose={onClose}
        PaperProps={{
          sx: {
            width: 250,
            paddingX: 2,
          },
          ...PaperProps,
        }}
        {...props}
      >
        {children}
      </Drawer>
    )
  }

  return (
    <>
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
    </>
  )
}

export default SidebarMenuRoot
