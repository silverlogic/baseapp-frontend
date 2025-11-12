import { Box } from '@mui/material'
import { styled } from '@mui/material/styles'

export const HeaderContainer = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateRows: '144px auto',
  justifyItems: 'center',
  width: '100%',
  padding: theme.spacing(3.5),
  gap: theme.spacing(2),
}))

export const TitleContainer = styled(Box)(() => ({
  width: '100%',
  textAlign: 'center',
  display: 'grid',
  justifyItems: 'center',
  gridTemplateRows: '22px 22px',
  gap: '8px',
}))

export const SubheaderContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  padding: theme.spacing(2),
  gap: theme.spacing(1),
}))

export const Subheader = styled(Box)(({ theme }) => ({
  paddingTop: theme.spacing(2),
  paddingBottom: theme.spacing(2),
}))
