import { Box, Fab, styled } from '@mui/material'

export const ImageCarouselContainer = styled(Box)(({ theme }) => ({
  background: theme.palette.common.black,
  width: 600,
  height: '100%',
  justifyContent: 'center',
  display: 'flex',
}))

export const ArrowFab = styled(Fab, {
  shouldForwardProp: (prop) => prop !== 'orientation',
})<{ orientation: 'left' | 'right' }>(({ theme, orientation }) => ({
  left: orientation === 'left' ? 0 : undefined,
  margin: theme.spacing(1),
  opacity: 0.72,
  position: 'absolute',
  right: orientation === 'right' ? 0 : undefined,
}))
