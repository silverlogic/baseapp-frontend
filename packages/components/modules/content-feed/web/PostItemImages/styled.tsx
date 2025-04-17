import { Box, styled } from '@mui/material'

export const ImageSlide = styled('img')(() => ({
  height: '100%',
  userSelect: 'none',
}))

export const ImageCarouselContainer = styled(Box)(() => ({
  background: '#000',
  width: 600,
  height: '100%',
  justifyContent: 'center',
  display: 'flex',
}))
