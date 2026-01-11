import { FC, PropsWithChildren } from 'react'

import { Stack } from '@mui/material'

const SidebarMenuListGroupRoot: FC<PropsWithChildren> = ({ children }) => {
  return <Stack gap={0.5}>{children}</Stack>
}

export default SidebarMenuListGroupRoot
