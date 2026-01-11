import { FC, PropsWithChildren } from 'react'

import { Box } from '@mui/material'

const SidebarMenuHeaderSlot: FC<PropsWithChildren> = ({ children }) => {
  return <Box>{children}</Box>
}

export default SidebarMenuHeaderSlot
