import { PropsWithChildren } from 'react'

import { CollapseProps } from '@mui/material'

export interface SidebarMenuNavGroupContentProps extends PropsWithChildren<CollapseProps> {
  open?: boolean
}
