'use client'

import { ComponentType } from 'react'

import { Box, BoxProps, styled } from '@mui/material'

export const ImageBox: ComponentType<BoxProps> = styled(Box)(({ theme }) => ({
  position: 'relative',
  width: '100%',
  height: '260px',
  borderRadius: theme.spacing(1),
  overflow: 'hidden',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  [theme.breakpoints.up('md')]: {
    height: '290px',
  },
  '& img': {
    width: '100%',
    height: 'auto',
    objectFit: 'cover',
  },
}))
