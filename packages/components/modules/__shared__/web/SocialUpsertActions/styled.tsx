import { styled } from '@mui/material/styles'

export const ActionsContainer = styled('div')(({ theme }) => ({
  display: 'grid',
  gap: theme.spacing(1),
  gridTemplateColumns: 'repeat(2, max-content)',
}))
