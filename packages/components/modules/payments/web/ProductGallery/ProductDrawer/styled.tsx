import { Box, Drawer, Typography } from '@mui/material'
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
