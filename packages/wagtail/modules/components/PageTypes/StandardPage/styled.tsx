'use client'

import { styled } from '@mui/material'
import { Box } from '@mui/system'

export const ImageBox = styled(Box)(({ theme }) => ({
  position: 'relative',
  width: '100%',
  height: '260px',
  borderRadius: theme.spacing(1),
  overflow: 'hidden',
  [theme.breakpoints.up('md')]: {
    height: '290px',
  },
}))