import { Box } from '@mui/material'
import { styled } from '@mui/material/styles'

export const ChatHeaderContainer = styled(Box)(({ theme }) => ({
  alignItems: 'center',
  borderRadius: 0,
  display: 'grid',
  gap: theme.spacing(1.5),
  gridTemplateColumns: 'min-content min-content 1fr',
  height: '56px',
  padding: `0 ${theme.spacing(2)}`,
  width: '100%',
  [theme.breakpoints.down('md')]: {
    borderTop: `1px ${theme.palette.divider} solid`,
  },
}))
