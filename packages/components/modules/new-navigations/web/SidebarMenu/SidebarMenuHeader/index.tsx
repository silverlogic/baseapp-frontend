import { FC } from 'react'
import { Box } from '@mui/material'
import { SidebarMenuHeaderProps } from './types'

const SidebarMenuHeader: FC<SidebarMenuHeaderProps> = ({ children, sx, ...props }) => {
  console.log('children', children)
  return <Box sx={{ padding: (theme) => theme.spacing(3, 2, 2, 2), ...sx }} {...props}>{children}</Box>
}

export default SidebarMenuHeader
