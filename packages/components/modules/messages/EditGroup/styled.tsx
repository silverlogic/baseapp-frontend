import { Box } from '@mui/material'
import { styled } from '@mui/material/styles'

export const HeaderContainer = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '24px auto 24px',
  width: '100%',
  padding: theme.spacing(2),
  borderBottom: `1px solid ${theme.palette.divider}`,
}))
