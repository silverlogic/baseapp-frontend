import { FC } from 'react'

import { NonUndefined } from '@baseapp-frontend/utils'

import { Box } from '@mui/material'

import DefaultContent from './Content'
import { SidebarMenuFooterProps, SidebarMenuFooterSlots } from './types'

const SidebarMenuFooter: FC<SidebarMenuFooterProps> = ({ slots, slotProps, sx, ...props }) => {
  const { Content = DefaultContent } = slots || ({} as NonUndefined<SidebarMenuFooterSlots>)

  return (
    <Box sx={{ paddingBottom: (theme) => theme.spacing(2), ...sx }} {...props}>
      <Content {...slotProps?.Content} />
    </Box>
  )
}

export default SidebarMenuFooter
