import { Box } from '@mui/material'
import { styled } from '@mui/material/styles'

export const AddCardModalContainer = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxHeight: '80vh',
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[24],
  padding: theme.spacing(4),
  borderRadius: theme.shape.borderRadius,
  gap: theme.spacing(2),
  display: 'flex',
  flexDirection: 'column',
  overflowY: 'auto',
}))
