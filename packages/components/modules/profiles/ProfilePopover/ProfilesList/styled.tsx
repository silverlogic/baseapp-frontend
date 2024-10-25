import { List, ListProps, Skeleton, styled } from '@mui/material'

export const ProfileMenuItemSkeleton = styled(Skeleton)(({ theme }) => ({
  width: '100%',
  height: 52,
  borderRadius: theme.spacing(0.75),
}))

export const StyledList = styled(List, { shouldForwardProp: (prop) => prop !== 'active' })<
  ListProps & { maxHeight: number }
>(({ maxHeight }) => ({
  maxHeight,
  overflowY: 'auto',
  '@media (max-height: 570px)': {
    maxHeight: '35vh',
  },
}))
