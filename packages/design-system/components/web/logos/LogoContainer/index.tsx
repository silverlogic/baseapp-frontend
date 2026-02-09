'use client'

import { forwardRef } from 'react'

import { Box, Link } from '@mui/material'

import { LogoContainerProps } from './types'

const LogoContainer = forwardRef<HTMLDivElement, LogoContainerProps>(
  ({ children, disabledLink = false, sx, ...other }, ref) => {
    const logo = (
      <Box
        ref={ref}
        component="div"
        sx={{
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

export default LogoContainer
