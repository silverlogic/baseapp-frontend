import { Box } from '@mui/material'
import { styled } from '@mui/material/styles'

export const Container = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.spacing(1),
  display: 'flex',
  gap: theme.spacing(1),
  padding: theme.spacing(0.75, 1),
  position: 'absolute',
  right: '12px',
  top: '-12px',
  zIndex: 1,
}))

export const IconButtonContentContainer = styled(Box)(({ theme }) => ({
  alignItems: 'center',
  display: 'grid',
  gridTemplateColumns: 'minmax(max-content, 24px) 1fr',
  gap: theme.spacing(1),
  alignSelf: 'center',
}))
