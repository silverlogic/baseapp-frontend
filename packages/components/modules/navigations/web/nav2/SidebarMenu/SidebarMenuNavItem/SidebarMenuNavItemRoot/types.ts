import { PropsWithChildren } from 'react'

import { ListItemButtonProps } from '@mui/material'
import { LinkProps } from 'next/link'

export interface SidebarMenuNavItemRootProps extends PropsWithChildren {
  ListItemButtonProps?: ListItemButtonProps
  LinkProps?: LinkProps
  type?: 'externalLink' | 'internalLink' | 'button'
}
