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
  [theme.breakpoints.up('lg')]: {
    flexDirection: imagePosition === 'left' ? 'row-reverse' : 'row',
  },
}))

export const ContentContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(5),
  display: 'flex',
  flexDirection: 'column',
  [theme.breakpoints.up('lg')]: {
    width: '50%',
  },
}))

export const TextContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1),
  marginBottom: theme.spacing(3.5),
}))

export const ImageContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  height: '215px',
  [theme.breakpoints.up('lg')]: {
    height: 'auto',
    width: '50%',
  },
}))
