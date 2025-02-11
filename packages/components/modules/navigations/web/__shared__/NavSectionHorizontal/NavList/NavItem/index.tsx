import { forwardRef } from 'react'

import { ChevronIcon } from '@baseapp-frontend/design-system/components/web/icons'
import { Iconify } from '@baseapp-frontend/design-system/components/web/images'

import Box from '@mui/material/Box'
import Tooltip from '@mui/material/Tooltip'

import { StyledLink, StyledNavItem } from './styled'
import { NavItemProps } from './types'

const NavItem = forwardRef<HTMLDivElement, NavItemProps>(
  (
    {
      itemData: { title, path = '', icon, info, disabled, caption, externalLink = false },
      open,
      depth,
      active,
      hasChild,
      hasTabLayout,
      ...props
    },
    ref,
  ) => {
    const subItem = depth !== 1

    const renderChildIcon = () => {
      if (!hasChild) return null
      if (subItem) return <ChevronIcon position="right" />
      return <ChevronIcon />
    }

    const content = (
      <StyledNavItem
        ref={ref}
        open={open}
        depth={depth}
        active={active}
        disabled={disabled}
        hasTabLayout={hasTabLayout}
        disableRipple={hasTabLayout}
        {...props}
      >
        {icon && (
          <Box component="span" className="icon">
            {icon}
          </Box>
        )}

        {title && (
          <Box component="span" className="label">
            {title}
          </Box>
        )}

        {caption && (
          <Tooltip title={caption} arrow>
            <Iconify width={16} icon="eva:info-outline" className="caption" />
          </Tooltip>
        )}

        {info && (
          <Box component="span" className="info">
            {info}
          </Box>
        )}

        {renderChildIcon()}
      </StyledNavItem>
    )

    if (externalLink)
      return (
        <StyledLink
          href={path}
          target="_blank"
          rel="noopener"
          color="inherit"
          underline="none"
          disabled={disabled}
          active={active}
          hasTabLayout={hasTabLayout}
        >
          {content}
        </StyledLink>
      )

    return (
      <StyledLink
        href={path}
        color="inherit"
        underline="none"
        disabled={disabled}
        active={active}
        hasTabLayout={hasTabLayout}
      >
        {content}
      </StyledLink>
    )
  },
)

export default NavItem
