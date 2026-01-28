import { FC } from 'react'

import { ListItemButton, alpha } from '@mui/material'
import Link from 'next/link'

import { SidebarMenuNavItemRootProps } from './types'
import { useActiveLink } from '../../../../../navigations/web/__shared__/useActiveLink'

const SidebarMenuNavItemRoot: FC<SidebarMenuNavItemRootProps> = ({
  children,
  componentType = 'internalLink',
  path,
  hide = false,
  deep = false,
  ...props
}) => {

  const isActive = !!path ? useActiveLink(path, deep) : false
  const component = (componentType === 'button' || !path) ? 'button' : Link
  const target = componentType === 'externalLink' ? '_blank' : undefined
  const rel = componentType === 'externalLink' ? 'noopener' : undefined


  if (hide) return null

  return (
    <ListItemButton
      component={component}
      href={path}
      target={target}
      rel={rel}
      disableGutters
      sx={{
        minHeight: '44px',
        padding: '0px 8px 0px 16px',
        width: '100%',
        flex: 1,
        ...(isActive && {
          backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.08),
          svg: {
            color: (theme) => theme.palette.primary.main,
          },
          '.label': {
            color: (theme) => theme.palette.primary.main,
          },
        }),
      }}
      {...props}
    >
      {children}
    </ListItemButton>
  )
}

export default SidebarMenuNavItemRoot
