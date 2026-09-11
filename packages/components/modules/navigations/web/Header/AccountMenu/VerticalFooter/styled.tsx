import { Box, ButtonBase } from '@mui/material'
import { styled } from '@mui/material/styles'

import { ARROW_ICON_SIZE } from './constants'

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

export const ProfileInfoContainer = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  flexGrow: 1,
  gap: 0,
  minWidth: 0,
}))

export const ArrowContainer = styled(Box)(({ theme }) => ({
  alignItems: 'center',
  color: theme.palette.text.secondary,
  display: 'flex',
  flexShrink: 0,
  height: ARROW_ICON_SIZE,
  justifyContent: 'center',
  width: ARROW_ICON_SIZE,
}))
