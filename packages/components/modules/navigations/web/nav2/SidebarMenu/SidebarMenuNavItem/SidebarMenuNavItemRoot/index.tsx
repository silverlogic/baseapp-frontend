import { FC, PropsWithChildren } from 'react'

import { ListItemButton, ListItemButtonProps } from '@mui/material'
import Link, { LinkProps } from 'next/link'

import { SidebarMenuNavItemRootProps } from './types'

const SidebarMenuNavItemRoot: FC<SidebarMenuNavItemRootProps> = ({
  children,
  ListItemButtonProps = {},
  LinkProps = { href: '' },
  type = 'internalLink',
}) => {
  if (type === 'button') {
    return (
      <ListItemButton
        disableGutters
        sx={{ minHeight: '44px', padding: '0px 8px 0px 16px' }}
        {...ListItemButtonProps}
      >
        {children}
      </ListItemButton>
    )
  }

  if (type === 'externalLink') {
    return (
      <Link target="_blank" rel="noopener" {...LinkProps}>
        <ListItemButton
          disableGutters
          sx={{ minHeight: '44px', padding: '0px 8px 0px 16px' }}
          {...ListItemButtonProps}
        >
          {children}
        </ListItemButton>
      </Link>
    )
  }

  return (
    <Link {...LinkProps}>
      <ListItemButton
        disableGutters
        sx={{ minHeight: '44px', padding: '0px 8px 0px 16px' }}
        {...ListItemButtonProps}
      >
        {children}
      </ListItemButton>
    </Link>
  )
}

export default SidebarMenuNavItemRoot
