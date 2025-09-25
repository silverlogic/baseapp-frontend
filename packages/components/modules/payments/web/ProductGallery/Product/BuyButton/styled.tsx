import { Box, Button } from '@mui/material'
import { styled } from '@mui/material/styles'

export const ButtonContainer = styled(Box)(() => ({
  display: 'flex',
  padding: '8px 16px 16px 16px',
  justifyContent: 'flex-end',
  alignItems: 'center',
  alignSelf: 'stretch',
}))

export const StyledButton = styled(Button)(() => ({
  display: 'flex',
  height: '30px',
  minWidth: '64px',
  padding: '0px 8px',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '8px',
  flex: '1 0 0',
}))
