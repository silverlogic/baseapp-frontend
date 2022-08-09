import { styled } from '@mui/material/styles'
import { Button as MUIButton } from '@mui/material'

export const Button = styled(MUIButton)(({ theme }) => ({
  background: theme.palette.primary.main,
}))
