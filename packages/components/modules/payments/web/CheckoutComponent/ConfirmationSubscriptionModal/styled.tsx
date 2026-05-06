import { Box } from '@mui/material'
import { styled } from '@mui/material/styles'

interface ConfirmationSubscriptionModalStyledProps {
  isMobile?: boolean
}

export const ConfirmationSubscriptionModalStyled = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'isMobile',
})<ConfirmationSubscriptionModalStyledProps>(({ theme, isMobile }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: isMobile ? '90%' : 400,
  maxWidth: 500,
  boxShadow: theme.shadows[24],
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(4),
  borderRadius: theme.shape.borderRadius,
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
}))
