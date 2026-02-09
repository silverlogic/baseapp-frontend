import { FC } from 'react'

import { ListItemButton, alpha } from '@mui/material'
import Link from 'next/link'

import { useActiveLink } from '../../../__shared__/useActiveLink'
import { RootProps } from './types'

const Root: FC<RootProps> = ({
  children,
  componentType = 'internalLink',
  path,
  hide = false,
  deep = false,
  ...props
}) => {
  const active = useActiveLink(path, deep)
  const component = componentType === 'button' || !path ? 'button' : Link
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
        ...(active && {
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

export default Root
