import { Box, Chip, Drawer, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'

export const StyledDrawer = styled(Drawer, {
  shouldForwardProp: (prop) => prop !== 'isMobile',
})<{ isMobile?: boolean }>(({ isMobile }) => ({
  '& .MuiDrawer-paper': {
    width: isMobile ? '100%' : 400,
    boxSizing: 'border-box',
  },
}))
export const DrawerTitle = styled(Typography)(() => ({
  fontSize: '18px',
  fontStyle: 'normal',
  fontWeight: 700,
  lineHeight: '155.55%',
}))
export const DrawerTitleContainer = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  padding: '16px 20px',
}))
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
export const DrawerDescriptionContainer = styled(Box)(() => ({
  padding: '24px',
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
}))

export const PackageContainer = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
}))

export const StyledChip = styled(Chip)(() => ({
  height: 24,
  fontSize: 13,
}))
