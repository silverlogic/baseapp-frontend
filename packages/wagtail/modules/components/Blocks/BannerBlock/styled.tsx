'use client'

import { Box, styled } from '@mui/material'

import { ContainerProps } from './types'

export const BannerContainer = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'imagePosition',
})<ContainerProps>(({ theme, imagePosition }) => ({
  flexDirection: 'column-reverse',
  background: theme.palette.primary.dark,
  display: 'flex',
  borderRadius: theme.spacing(3),
  overflow: 'hidden',
  [theme.breakpoints.up('md')]: {
    flexDirection: imagePosition === 'left' ? 'row-reverse' : 'row',
  },
}))

export const ContentContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3.5),
  display: 'flex',
  flexDirection: 'column',
  [theme.breakpoints.up('md')]: {
    width: '50%',
    padding: theme.spacing(5),
  },
}))

export const TextContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1),
}))

export const ImageContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  height: '215px',
  [theme.breakpoints.up('md')]: {
    height: 'auto',
    width: '50%',
  },
  '& img': {
    height: '100%',
    width: '100%',
  },
}))
