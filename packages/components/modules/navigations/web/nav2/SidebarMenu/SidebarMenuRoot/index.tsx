import { FC } from 'react'

import { useResponsive } from '@baseapp-frontend/design-system/hooks/web'

import { Box, Drawer, Stack } from '@mui/material'

import { NAV_WIDTH } from '../../../constants'
import NavToggleButton from '../ToggleButton'
import { SidebarMenuRootProps } from './types'

const SidebarMenuRoot: FC<SidebarMenuRootProps> = ({
  children,
  PaperProps,
  open,
  onClose,
  hideToggleButton = false,
  ToggleButton = NavToggleButton,
  ToggleButtonProps,
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
          sx={{
            height: 1,
            position: 'fixed',
            width: NAV_WIDTH.VERTICAL,
            borderRight: (theme) => `solid 1px ${theme.palette.divider}`,
          }}
        >
          {children}
        </Stack>
      </Box>
      {!hideToggleButton && <ToggleButton {...ToggleButtonProps} />}
    </>
  )
}

export default SidebarMenuRoot
