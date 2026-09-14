import { styled } from '@mui/material/styles'

export const Container = styled('div')(({ theme }) => ({
  alignItems: 'center',
  display: 'flex',
  justifyContent: 'space-around',
  minHeight: theme.spacing(8),
  width: '100%',
  [theme.breakpoints.down('lg')]: {
    display: 'none',
  },
}))

export const ItemsContainer = styled('div')({
  display: 'flex',
  gap: 6,
  height: '100%',
})
