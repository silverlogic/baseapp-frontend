import { styled } from '@mui/material/styles'

export const CounterContainer = styled('div')(({ theme }) => ({
  display: 'grid',
  gap: theme.spacing(0.5),
  gridTemplateColumns: 'repeat(2, minmax(20px, max-content))',
}))
