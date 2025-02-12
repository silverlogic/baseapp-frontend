import { Box } from '@mui/material'
import { styled } from '@mui/material/styles'

export const AvatarButtonContainer = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '48px auto',
  gap: theme.spacing(1.5),
  padding: `${theme.spacing(1.5)} ${theme.spacing(2.5)}`,
  cursor: 'pointer',
  [theme.breakpoints.down('sm')]: {
    padding: `${theme.spacing(1.5)} ${theme.spacing(1.5)}`,
  },
}))
