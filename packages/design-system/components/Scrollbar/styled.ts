'use client'

import { alpha, styled } from '@mui/material/styles'
import SimpleBar from 'simplebar-react'

export const StyledRootScrollbar = styled('div')(() => ({
  flexGrow: 1,
  height: 'fit-content',
  overflow: 'hidden',
}))

export const StyledScrollbar = styled(SimpleBar)(({ theme }) => ({
  maxHeight: '100%',
  '& .simplebar-scrollbar': {
    '&:before': {
      backgroundColor: alpha(theme.palette.grey[600], 0.48),
    },
    '&.simplebar-visible:before': {
      opacity: 1,
    },
  },
  '& .simplebar-mask': {
    zIndex: 'inherit',
  },
}))
