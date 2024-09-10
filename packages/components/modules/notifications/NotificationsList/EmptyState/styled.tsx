import { Box } from '@mui/material'
import { styled } from '@mui/material/styles'

export const Container = styled(Box)(({ theme }) => ({
  height: '100%',
  width: '100%',
  display: 'grid',
  gap: theme.spacing(2),
  justifyItems: 'center',
  alignContent: 'center',
  gridAutoRows: 'min-content',
  backgroundColor: theme.palette.common.white,
}))
