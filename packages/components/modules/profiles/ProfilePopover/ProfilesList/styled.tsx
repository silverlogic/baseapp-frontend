import { List, ListProps, MenuItem, MenuItemProps, styled } from '@mui/material'

export const StyledList = styled(List, { shouldForwardProp: (prop) => prop !== 'maxHeight' })<
  ListProps & { maxHeight: number }
>(({ maxHeight }) => ({
  maxHeight,
  overflowY: 'auto',
  '@media (max-height: 570px)': {
    maxHeight: '35vh',
  },
}))

export const CancelMenuItem = styled(MenuItem)<MenuItemProps>(({ theme }) => ({
  ...theme.typography.body2,
  p: 1,
  gap: 1,
  justifyContent: 'start',
  width: '100%',
}))
