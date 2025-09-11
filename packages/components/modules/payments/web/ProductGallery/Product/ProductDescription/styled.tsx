import { Box, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'

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
