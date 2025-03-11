import { forwardRef } from 'react'

import { ChevronIcon } from '@baseapp-frontend/design-system/components/web/icons'

import { Box, Tooltip } from '@mui/material'
import Link from 'next/link'

import type { NavItemProps } from '../../../../../types'
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

    const renderChildIcon = () => {
      if (!hasChild) return null
      if (open) return <ChevronIcon />
      return <ChevronIcon position="right" />
    }

    const content = (
      <StyledNavItem
        ref={ref}
        disableGutters
        open={open}
        depth={depth}
        active={active}
        disabled={disabled}
        {...props}
      >
        {!subItem && icon && (
          <Box component="span" className="icon">
            {icon}
          </Box>
        )}

        {subItem && icon ? (
          <Box component="span" className="icon">
            {icon}
          </Box>
        ) : (
          <Box component="span" className="sub-icon" />
        )}

        {title && (
          <Box component="span" sx={{ flex: '1 1 auto', minWidth: 0 }}>
            <Box component="span" className="label">
              {title}
            </Box>

            {caption && (
              <Tooltip title={caption} placement="top-start">
                <Box component="span" className="caption">
                  {caption}
                </Box>
              </Tooltip>
            )}
          </Box>
        )}

        {info && (
          <Box component="span" className="info">
            {info}
          </Box>
        )}

        {renderChildIcon()}
      </StyledNavItem>
    )

    if (hasChild) {
      return content
    }

    if (externalLink)
      return (
        <Link
          href={path}
          target="_blank"
          rel="noopener"
          style={{
            color: 'inherit',
            textDecoration: 'none',
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
        style={{
          color: 'inherit',
          textDecoration: 'none',
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
