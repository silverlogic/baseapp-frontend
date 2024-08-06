'use client'

import Box, { BoxProps } from '@mui/material/Box'
import { styled } from '@mui/material/styles'

const HeaderShadow = styled(Box)<BoxProps>(({ theme }) => ({
  left: 0,
  right: 0,
  bottom: 0,
  m: 'auto',
  height: 24,
  zIndex: -1,
  opacity: 0.48,
  borderRadius: '50%',
  position: 'absolute',
  width: `calc(100% - 48px)`,
  boxShadow: theme.customShadows.z8,
}))

export default HeaderShadow
