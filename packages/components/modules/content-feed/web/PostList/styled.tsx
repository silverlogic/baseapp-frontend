import { Box, Stack, styled } from '@mui/material'

export const RootContainer = styled(Box)(() => ({
  display: 'flex',
  width: '600px',
  alignSelf: 'center',
  flexDirection: 'column',
}))

export const HeaderContainer = styled(Box)(() => ({
  display: 'flex',
  width: '100%',
  alignSelf: 'center',
  flexDirection: 'row',
  justifyContent: 'space-between',
}))

export const ButtonContainer = styled(Box)(() => ({
  display: 'flex',
  width: 'fit-content',
  flexDirection: 'row',
  justifyContent: 'space-between',
  gap: '10px',
}))

export const PostsListContainer = styled(Stack)(({ theme }) => ({
  '& > :not(:last-of-type)': {
    borderBottom: '1px solid',
    borderColor: theme.palette.divider,
  },
}))

export const PostHeaderContainer = styled(Stack)(({ theme }) => ({
  padding: theme.spacing(1, 5),
}))
