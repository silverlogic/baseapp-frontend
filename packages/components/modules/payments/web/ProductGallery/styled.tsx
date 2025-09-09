import { Box } from '@mui/material'
import { styled } from '@mui/material/styles'

export const GalleryContainer = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'isMobile',
})<{ isMobile?: boolean }>(({ isMobile }) => ({
  margin: '0 auto',
  width: isMobile ? '100%' : 624,
  ...(isMobile ? { padding: '12px 16px' } : {}),
}))
