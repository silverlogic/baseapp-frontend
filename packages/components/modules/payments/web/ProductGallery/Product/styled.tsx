import { Box, Button, Typography } from '@mui/material'
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
