import { Button } from '@mui/material'
import { styled } from '@mui/material/styles'

export const LoadMoreRepliesButton = styled(Button)(({ theme }) => ({
  color: theme.palette.text.primary,
  width: 'max-content',
  '&:hover': {
    background: 'transparent',
  },
}))
