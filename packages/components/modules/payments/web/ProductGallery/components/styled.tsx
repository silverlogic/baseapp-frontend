import { Box, Button, Chip, Drawer, Typography } from '@mui/material'
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

export const DrawerCarouselContainer = styled(Box)(() => ({
  maxHeight: 209,
  width: '100%',
  margin: '0 auto',
  position: 'relative',
  overflow: 'hidden',
}))

export const DrawerTitleContainer = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  padding: '16px 20px',
}))

export const GalleryContainer = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'isMobile',
})<{ isMobile?: boolean }>(({ isMobile }) => ({
  margin: '0 auto',
  width: isMobile ? '100%' : 624,
  ...(isMobile ? { padding: '12px 16px' } : {}),
}))

export const ImageContainer = styled('img')(() => ({
  width: '100%',
  height: 'auto',
  borderRadius: '12px 12px 0 0',
  objectFit: 'contain',
}))

export const DrawerImageContainer = styled('img')(() => ({
  width: '100%',
  height: 'auto',
  objectFit: 'contain',
}))

export const OverlayContainer = styled(Box)(() => ({
  position: 'absolute',
  top: '50%',
  left: 0,
  right: 0,
  transform: 'translateY(-50%)',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingLeft: '12px',
  paddingRight: '12px',
}))

export const StyledIconButton = styled('button')(({ theme }) => ({
  backgroundColor: theme.palette.primary.contrastText,
  opacity: 0.24,
  borderRadius: '50%',
  width: 20,
  height: 20,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  '&:hover': {
    backgroundColor: theme.palette.primary.contrastText,
    opacity: 0.72,
  },
}))

export const IndicatorContainer = styled(Box)(() => ({
  position: 'absolute',
  bottom: 8,
  left: 0,
  right: 0,
  display: 'flex',
  justifyContent: 'center',
}))

export const Indicator = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'active',
})<{ active: boolean }>(({ theme, active }) => ({
  width: active ? 18 : 8,
  height: 8,
  margin: '0 4px',
  borderRadius: active ? '4px' : '50%',
  backgroundColor: theme.palette.primary.contrastText,
  opacity: active ? 1 : 0.24,
  transition: 'background-color 0.3s ease',
}))

export const DescriptionContainer = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'isMobile',
})<{ isMobile?: boolean }>(({ isMobile }) => ({
  width: isMobile ? 170 : 197,
  height: 106,
  display: 'flex',
  padding: isMobile ? '8px 12px' : '12px 16px',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: '8px',
  alignSelf: 'stretch',
}))

export const DrawerDescriptionContainer = styled(Box)(() => ({
  padding: '24px',
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
}))

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

export const Description = styled(Typography)(() => ({
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  WebkitLineClamp: 2,
}))

export const Title = styled(Typography)(() => ({
  fontSize: '12px',
  fontStyle: 'normal',
  fontWeight: 600,
  lineHeight: '12px',
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  WebkitLineClamp: 1,
}))
export const DrawerTitle = styled(Typography)(() => ({
  fontSize: '18px',
  fontStyle: 'normal',
  fontWeight: 700,
  lineHeight: '155.55%',
}))

export const ButtonContainer = styled(Box)(() => ({
  display: 'flex',
  padding: '8px 16px 16px 16px',
  justifyContent: 'flex-end',
  alignItems: 'center',
  alignSelf: 'stretch',
}))

export const StyledButton = styled(Button)(() => ({
  display: 'flex',
  height: '30px',
  minWidth: '64px',
  padding: '0px 8px',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '8px',
  flex: '1 0 0',
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

export const StyledDrawer = styled(Drawer, {
  shouldForwardProp: (prop) => prop !== 'isMobile',
})<{ isMobile?: boolean }>(({ isMobile }) => ({
  '& .MuiDrawer-paper': {
    width: isMobile ? '100%' : 400,
    boxSizing: 'border-box',
  },
}))
