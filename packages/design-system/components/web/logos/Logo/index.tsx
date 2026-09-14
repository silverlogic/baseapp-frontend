'use client'

import { forwardRef } from 'react'

import { Link } from '@mui/material'

import { LogoContainer } from './styled'
import { LogoProps } from './types'

const Logo = forwardRef<HTMLDivElement, LogoProps>(
  ({ children, disabledLink = false, sx, ...other }, ref) => {
    const logo = (
      <LogoContainer ref={ref} sx={sx} {...other}>
        {children}
      </LogoContainer>
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
