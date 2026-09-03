import { Theme, styled } from '@mui/material/styles'

export const ProfileContainer = styled('div')(({ theme }) => ({
  alignItems: 'center',
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1),
  justifyContent: 'center',
  width: '100%',
}))

const profileRow = (theme: Theme, columns: string) => ({
  alignItems: 'center',
  display: 'grid',
  gap: theme.spacing(0.5),
  gridTemplateColumns: columns,
  justifyContent: 'center',
  width: '100%',
  [theme.breakpoints.up('lg')]: {
    gap: theme.spacing(1),
  },
})

export const SwitchProfileRow = styled('div')(({ theme }) =>
  profileRow(theme, '1fr max-content max-content'),
)

export const CurrentProfileRow = styled('div')(({ theme }) => profileRow(theme, '1fr 40px 40px'))
