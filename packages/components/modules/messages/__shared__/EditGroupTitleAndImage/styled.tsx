import { Box } from '@mui/material'
import { styled } from '@mui/material/styles'

export const UploadImageContainer = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateRows: '1fr min-content',
  justifyContent: 'center',
  justifyItems: 'center',
  gap: theme.spacing(2),
  padding: theme.spacing(1.5),
}))
