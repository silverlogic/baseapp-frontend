import { Box } from '@mui/material'
import { styled } from '@mui/material/styles'

export const ProfileSummaryHeaderContainer = styled(Box)(({ theme }) => ({
  borderBottom: `1px ${theme.palette.divider} solid`,
  width: '100%',
  padding: theme.spacing(2),
  display: 'grid',
  gridTemplateColumns: '24px auto 24px',
  gap: theme.spacing(1.5),
  alignItems: 'center',
  [theme.breakpoints.down('sm')]: {
    padding: `${theme.spacing(2)} ${theme.spacing(1.5)} ${theme.spacing(2)}`,
  },
}))
