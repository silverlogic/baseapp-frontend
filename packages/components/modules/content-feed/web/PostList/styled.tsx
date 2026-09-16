import { Stack, styled } from '@mui/material'

export const HeaderSpacer = styled('div')(({ theme }) => ({
  height: theme.spacing(1),
}))

export const PostsListContainer = styled(Stack)(({ theme }) => ({
  '& > :not(:last-of-type)': {
    borderBottom: '1px solid',
    borderColor: theme.palette.divider,
  },
}))
