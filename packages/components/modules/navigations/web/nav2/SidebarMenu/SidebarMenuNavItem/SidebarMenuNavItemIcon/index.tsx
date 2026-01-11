import { FC } from 'react'

import { Box, Theme } from '@mui/material'

import { SidebarMenuNavItemIconProps } from './types'

const SidebarMenuNavItemIcon: FC<SidebarMenuNavItemIconProps> = ({ Icon, ...props }) => {
  return (
    <Box component="span" sx={{ lineHeight: 1 }} {...props}>
      <Icon sx={{ height: 24, width: 24, marginRight: (theme: Theme) => theme.spacing(2) }} />
    </Box>
  )
}

export default SidebarMenuNavItemIcon
