'use client'

import { forwardRef, memo } from 'react'

import { useSSR } from '@baseapp-frontend/utils'

import Box from '@mui/material/Box'

import { StyledRootScrollbar, StyledScrollbar } from './styled'
import { ScrollbarProps } from './types'

const Scrollbar = forwardRef<HTMLDivElement, ScrollbarProps>(({ children, sx, ...other }, ref) => {
  const { isSSR } = useSSR()

  const userAgent = typeof navigator === 'undefined' ? 'SSR' : navigator.userAgent
  const mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent)

  if (isSSR) {
    return (
      <Box ref={ref} sx={{ overflow: 'hidden', ...sx }} {...other}>
        {children}
      </Box>
    )
  }

  if (mobile) {
    return (
      <Box ref={ref} sx={{ overflow: 'auto', ...sx }} {...other}>
        {children}
      </Box>
    )
  }

  return (
    <StyledRootScrollbar>
      <StyledScrollbar
        scrollableNodeProps={{
          ref,
        }}
        clickOnTrack={false}
        sx={sx}
        {...other}
      >
        {children}
      </StyledScrollbar>
    </StyledRootScrollbar>
  )
})

export default memo(Scrollbar)
