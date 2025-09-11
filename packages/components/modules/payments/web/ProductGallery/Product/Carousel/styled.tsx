import { Box } from '@mui/material'
import { styled } from '@mui/material/styles'

export const CarouselContainer = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'isMobile',
})<{ isMobile?: boolean }>(({ isMobile }) => ({
  width: isMobile ? 170 : 197,
  height: isMobile ? 96 : 111,
  margin: '0 auto',
  position: 'relative',
  overflow: 'hidden',
}))

export const ImageContainer = styled('img')(() => ({
  width: '100%',
  height: 'auto',
  borderRadius: '12px 12px 0 0',
  objectFit: 'contain',
}))
