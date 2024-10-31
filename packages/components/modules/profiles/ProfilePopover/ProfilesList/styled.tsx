import { List, ListProps, styled } from '@mui/material'

export const StyledList = styled(List, { shouldForwardProp: (prop) => prop !== 'active' })<
  ListProps & { maxHeight: number }
>(({ maxHeight }) => ({
  maxHeight,
  overflowY: 'auto',
  '@media (max-height: 570px)': {
    maxHeight: '35vh',
  },
}))
