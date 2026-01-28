import { PropsWithChildren } from 'react'

import { ListItemButtonProps } from '@mui/material'
import { LinkProps } from 'next/link'

export interface SidebarMenuNavItemRootProps extends PropsWithChildren<ListItemButtonProps & Omit<LinkProps, 'href'>> {
  componentType?: 'externalLink' | 'internalLink' | 'button'
  path?: string
  hide?: boolean
  deep?: boolean
}
