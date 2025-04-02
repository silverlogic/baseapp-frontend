import { Button } from '@mui/material'
import { styled } from '@mui/material/styles'

export const StyledButton = styled(Button)(({ theme }) => ({
  justifyContent: 'flex-start',
  padding: '8px 14px',
  textTransform: 'none',
  height: '56px',
  border: '1px solid ',
  borderRadius: '8px',
  borderColor: theme.palette.divider,
}))
