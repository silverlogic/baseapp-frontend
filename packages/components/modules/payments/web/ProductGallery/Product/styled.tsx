import { Box } from '@mui/material'
import { styled } from '@mui/material/styles'

export const ProductContainer = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'isMobile',
})<{ isMobile?: boolean }>(({ theme, isMobile }) => ({
  width: isMobile ? 170 : 197,
  height: isMobile ? '100%' : 272,
  overflow: 'hidden',
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: '12px',
  backgroundColor: theme.palette.background.paper,
}))
