import { Box } from '@mui/material'
import { styled } from '@mui/material/styles'

export const DrawerCarouselContainer = styled(Box)(() => ({
  maxHeight: 209,
  width: '100%',
  margin: '0 auto',
  position: 'relative',
  overflow: 'hidden',
}))

export const DrawerImageContainer = styled('img')(() => ({
  width: '100%',
  height: 'auto',
  objectFit: 'contain',
}))
