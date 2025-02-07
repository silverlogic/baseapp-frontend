import { Box } from '@mui/material'
import { styled } from '@mui/material/styles'

export const HeaderContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: theme.spacing(2, 1, 2, 2.5),
  position: 'sticky',
  top: 0,
  zIndex: 1,
  backgroundColor: theme.palette.common.white,
}))
