import { FC } from 'react'

import { Box } from '@mui/material'
import { SidebarMenuFooterProps } from './types'

const SidebarMenuFooter: FC<SidebarMenuFooterProps> = ({ children, sx, ...props }) => {
  if (!children) return null
  return <Box sx={{ paddingBottom: (theme) => theme.spacing(2), ...sx }} {...props}>{children}</Box>
}

export default SidebarMenuFooter
