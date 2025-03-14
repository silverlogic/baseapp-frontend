import { Box } from '@mui/material'
import { styled } from '@mui/material/styles'

export const MainContainer = styled(Box)(({ theme }) => ({
  alignItems: 'center',
  display: 'grid',
  width: '100%',
  height: '100%',
  gridTemplateColumns: '48px auto min-content',
  gap: theme.spacing(1.5),
  padding: theme.spacing(1.5),
  [theme.breakpoints.down('sm')]: {
    maxWidth: '600px',
    padding: `${theme.spacing(1.5)} ${theme.spacing(1.5)}`,
  },
}))
