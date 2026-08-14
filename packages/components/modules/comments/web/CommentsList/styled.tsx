import { styled } from '@mui/material/styles'

export const HeaderSpacer = styled('div')(({ theme }) => ({
  height: theme.spacing(1),
}))

export const ScrollContainer = styled('div')({
  overflowX: 'auto',
})
