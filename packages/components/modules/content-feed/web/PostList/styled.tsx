import { Stack, styled } from '@mui/material'

export const PostsListContainer = styled(Stack)(({ theme }) => ({
  '& > :not(:last-of-type)': {
    borderBottom: '1px solid',
    borderColor: theme.palette.divider,
  },
}))
