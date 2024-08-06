import React, { forwardRef } from 'react'

import { ChevronIcon, Iconify } from '@baseapp-frontend/design-system'

import Box from '@mui/material/Box'
import Link from '@mui/material/Link'
import Tooltip from '@mui/material/Tooltip'

import type { NavItemProps } from '../../../../types'
import { StyledNavItem } from './styled'

const NavItem = forwardRef<HTMLDivElement, NavItemProps>(
  (
    {
      itemData: { title, path = '', icon, info, disabled, caption, externalLink = false },
      open,
      depth,
      active,
      hasChild,
      ...props
    },
    ref,
  ) => {
    const subItem = depth !== 1

    const content = (
      <StyledNavItem
        disableGutters
        ref={ref}
        open={open}
        depth={depth}
        active={active}
        disabled={disabled}
        {...props}
      >
        <div className="relative">
          {icon && (
            <Box component="span" className="icon">
              {icon}
            </Box>
          )}
          {hasChild && <ChevronIcon position="right" sx={{ position: 'absolute' }} />}
        </div>

        {title && (
          <Box component="span" className="label">
            {title}
          </Box>
        )}

        {caption && (
          <Tooltip title={caption} arrow placement="right">
            <Iconify width={16} icon="eva:info-outline" className="caption" />
          </Tooltip>
        )}

        {info && subItem && (
          <Box component="span" className="info">
            {info}
          </Box>
        )}
      </StyledNavItem>
    )

    if (externalLink)
      return (
        <Link
          href={path}
          target="_blank"
          rel="noopener noreferrer"
          color="inherit"
          underline="none"
          sx={{
            width: 1,
            ...(disabled && {
              pointerEvents: 'none',
            }),
          }}
        >
          {content}
        </Link>
      )

    return (
      <Link
        href={path}
        color="inherit"
        underline="none"
        sx={{
          width: 1,
          ...(disabled && {
            pointerEvents: 'none',
          }),
        }}
      >
        {content}
      </Link>
    )
  },
)

export default NavItem
