import { PropsWithChildren } from 'react'

import { ListSubheaderProps } from '@mui/material'

export interface SidebarMenuListHeaderProps extends PropsWithChildren<ListSubheaderProps> {
  title: string
}
