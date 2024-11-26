import { Box } from '@mui/material'
import { styled } from '@mui/material/styles'

export const MainContainer = styled(Box)(() => ({
  display: 'grid',
  justifySelf: 'center',
  height: '100%',
  width: '100%',
  gridTemplateRows: 'min-content min-content auto',
}))

export const SearchbarContainer = styled(Box)(({ theme }) => ({
  padding: `${theme.spacing(2)} ${theme.spacing(2.5)} 0`,
  [theme.breakpoints.down('sm')]: {
    padding: `${theme.spacing(2)} ${theme.spacing(1.5)} 0`,
  },
}))

export const GroupChatContainer = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '48px auto',
  gap: theme.spacing(1.5),
  padding: `${theme.spacing(1.5)} ${theme.spacing(2.5)}`,
  [theme.breakpoints.down('sm')]: {
    padding: `${theme.spacing(1.5)} ${theme.spacing(1.5)}`,
  },
}))

export const CreateChatRoomListContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  height: '100%',
  alignSelf: 'start',
  [theme.breakpoints.down('sm')]: {
    height: '100vh',
  },
}))
