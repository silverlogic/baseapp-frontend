import { Box } from '@mui/material'
import { styled } from '@mui/material/styles'

export const BodyTypographyContainer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.grey[200],
  borderRadius: 6,
  height: '100%',
  maxHeight: 64,
  padding: theme.spacing(1.25, 1.5),
}))
