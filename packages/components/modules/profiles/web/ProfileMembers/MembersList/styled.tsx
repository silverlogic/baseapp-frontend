import { Box, ListItem, styled } from '@mui/material'

import { UserListItemContainerProps } from './types'

export const UserListItemContainer = styled(ListItem)<UserListItemContainerProps>(
  ({ theme, isEmpty = false }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1),
    padding: theme.spacing(1),
    cursor: isEmpty ? 'default' : 'pointer',
    '&:hover': {
      backgroundColor: isEmpty ? 'transparent' : theme.palette.grey[300],
    },
  }),
)

export const EmailListItemContainer = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  cursor: 'pointer',
  width: '100%',
}))

export const AddMembersDialogHeader = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: 3,
}))
