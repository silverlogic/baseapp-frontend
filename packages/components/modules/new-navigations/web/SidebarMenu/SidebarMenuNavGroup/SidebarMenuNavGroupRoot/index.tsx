import { FC, PropsWithChildren, useCallback, useState } from 'react'

import { Stack } from '@mui/material'
import { SidebarMenuNavGroupRootProps } from './types'

const SidebarMenuNavGroupRoot: FC<SidebarMenuNavGroupRootProps> = ({ children, defaultOpen = true, hide = false, ...props }) => {
  const [open, setOpen] = useState(defaultOpen)

  const handleToggle = useCallback(() => {
    setOpen((prev) => !prev)
  }, [])

  if (hide) return null
  return <Stack gap={0.5} {...props}>{children({ open, handleToggle })}</Stack>
}

export default SidebarMenuNavGroupRoot
