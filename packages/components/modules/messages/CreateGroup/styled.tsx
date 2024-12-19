import { Box } from '@mui/material'
import { styled } from '@mui/material/styles'

export const SearchbarContainer = styled(Box)(({ theme }) => ({
  padding: `${theme.spacing(2)} ${theme.spacing(2.5)} 0`,
  [theme.breakpoints.down('sm')]: {
    padding: `${theme.spacing(2)} ${theme.spacing(1.5)} 0`,
  },
}))

export const HeaderContainer = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '24px auto 24px',
  alignItems: 'center',
  width: '100%',
  padding: theme.spacing(2),
  borderBottom: `1px solid ${theme.palette.divider}`,
}))

export const UploadProfileContainer = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateRows: '1fr min-content',
  justifyContent: 'center',
  gap: theme.spacing(2),
  padding: theme.spacing(1.5),
}))
