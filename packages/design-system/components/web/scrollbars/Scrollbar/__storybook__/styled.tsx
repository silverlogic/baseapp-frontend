import { Box } from '@mui/material'
import { styled } from '@mui/material/styles'

export const DemoBox = styled(Box)(({ theme }) => ({
  border: '1px solid',
  borderColor: theme.palette.grey[300],
  borderRadius: theme.shape.borderRadius * 2,
  height: 300,
  padding: theme.spacing(2),
  width: 300,
}))
