import { Box } from '@mui/material'
import { styled } from '@mui/material/styles'

export const SearchbarContainer = styled(Box)(({ theme }) => ({
  padding: `${theme.spacing(2)} ${theme.spacing(2.5)} 0`,
  [theme.breakpoints.down('sm')]: {
    padding: `${theme.spacing(2)} ${theme.spacing(1.5)} 0`,
  },
}))

export const ProfilesContainer = styled(Box)(({ theme }) => ({
  height: '100%',
  width: '100%',
  overflowY: 'auto',
  scrollbarWidth: 'none',
  [theme.breakpoints.down('sm')]: {
    // TODO: look for a better way to calculate the height, it doesn't consider different types of headers
    height: `calc(100vh - 72px - 57px - 305px)`,
  },
}))
