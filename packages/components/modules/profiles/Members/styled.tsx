import { Skeleton, styled } from '@mui/material'

export const MemberItemSkeleton = styled(Skeleton)(({ theme }) => ({
  width: '100%',
  height: 52,
  borderRadius: theme.spacing(0.75),
}))
