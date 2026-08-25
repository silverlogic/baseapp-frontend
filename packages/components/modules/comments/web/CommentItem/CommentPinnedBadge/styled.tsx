import { styled } from '@mui/material/styles'

export const BadgeContainer = styled('div')(({ theme }) => ({
  alignItems: 'center',
  display: 'grid',
  gap: theme.spacing(0.5),
  gridTemplateColumns: 'repeat(2, max-content)',
}))
