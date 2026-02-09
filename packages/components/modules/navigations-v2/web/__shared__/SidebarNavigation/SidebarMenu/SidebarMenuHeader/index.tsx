import { FC } from 'react'

import { LogoContainer as DefaultLogoContainer } from '@baseapp-frontend/design-system/components/web/logos'
import { NonUndefined } from '@baseapp-frontend/utils'

import { Box } from '@mui/material'

import { SidebarMenuHeaderProps, SidebarMenuHeaderSlots } from './types'

const SidebarMenuHeader: FC<SidebarMenuHeaderProps> = ({ slots, slotProps, sx, ...props }) => {
  const { Logo, LogoContainer = DefaultLogoContainer } =
    slots || ({} as NonUndefined<SidebarMenuHeaderSlots>)

  return (
    <Box sx={{ padding: (theme) => theme.spacing(3, 2, 2, 2), ...sx }} {...props}>
      <LogoContainer {...slotProps?.LogoContainer}>
        <Logo />
      </LogoContainer>
    </Box>
  )
}

export default SidebarMenuHeader
