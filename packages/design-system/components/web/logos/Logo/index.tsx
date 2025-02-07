'use client'

import { forwardRef } from 'react'

import { Box, Link } from '@mui/material'

import { LogoProps } from './types'

// TODO: move this to @baseapp-frontend/design-system/components/web/logos
const Logo = forwardRef<HTMLDivElement, LogoProps>(
  ({ children, disabledLink = false, sx, ...other }, ref) => {
    const logo = (
      <Box
        ref={ref}
        component="div"
        sx={{
          width: 40,
          height: 40,
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          ...sx,
        }}
        {...other}
      >
        {children}
      </Box>
    )

    if (disabledLink) {
      return logo
    }

    return (
      <Link href="/" sx={{ display: 'contents' }}>
        {logo}
      </Link>
    )
  },
)

export default Logo
