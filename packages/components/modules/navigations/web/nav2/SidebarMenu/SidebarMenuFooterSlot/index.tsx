import { FC, PropsWithChildren } from 'react'

import { Box } from '@mui/material'

const SidebarMenuFooterSlot: FC<PropsWithChildren> = ({ children }) => {
  return <Box>{children}</Box>
}

export default SidebarMenuFooterSlot
