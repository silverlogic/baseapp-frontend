import { Box } from '@mui/material'
import { styled } from '@mui/material/styles'

export const GalleryContainer = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'isMobile',
})<{ isMobile?: boolean }>(({ isMobile }) => ({
  margin: '0 auto',
  ...(isMobile ? { padding: '12px 16px' } : {}),
}))

export const StyledGrid = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'isMobile',
})<{ isMobile?: boolean }>(({ isMobile }) => ({
  display: 'grid',
  gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)',
  gap: '16px',
  width: '100%',
  padding: '16px',
  boxSizing: 'border-box',
  justifyItems: 'center',
}))

export const GridItem = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  margin: '0px',
}))
