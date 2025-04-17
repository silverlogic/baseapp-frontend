import { Box, styled } from '@mui/material'

export const RootContainer = styled(Box)(() => ({
  dispaly: 'flex',
  width: '600px',
  alignSelf: 'center',
  flexDirection: 'column',
}))

export const HeaderContainer = styled(Box)(() => ({
  display: 'flex',
  width: '100%',
  alignSelf: 'center',
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginBottom: '32px',
}))

export const ButtonContainer = styled(Box)(() => ({
  display: 'flex',
  width: 'fit-content',
  flexDirection: 'row',
  gap: '10px',
}))

export const SlideImage = styled('img')(() => ({
  height: '100%',
  userSelect: 'none',
}))
