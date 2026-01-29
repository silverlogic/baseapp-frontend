import { ButtonBase } from '@mui/material'
import { styled } from '@mui/material/styles'

export const StyledFooterButton = styled(ButtonBase)(({ theme }) => ({
  width: '100%',
  padding: theme.spacing(3),
  display: 'flex',
  alignItems: 'center',
  textAlign: 'left',
}))

export const StyledFooterButtonMini = styled(StyledFooterButton)(() => ({
  gap: 0,
}))

export const StyledFooterButtonDefault = styled(StyledFooterButton)(({ theme }) => ({
  gap: theme.spacing(2),
}))

