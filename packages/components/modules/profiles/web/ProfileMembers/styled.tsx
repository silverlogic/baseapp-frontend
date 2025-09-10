import { Box, Skeleton, styled } from '@mui/material'

import { MemberPersonalInfoProps } from './types'

export const MemberItemSkeleton = styled(Skeleton)(({ theme }) => ({
  width: '100%',
  height: 52,
  borderRadius: theme.spacing(0.75),
}))

export const MemberPersonalInformation = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'isActive',
})<MemberPersonalInfoProps>(({ isActive, theme }) => ({
  opacity: isActive ? 1 : 0.6,
  display: 'flex',
  gap: theme.spacing(1.5),
  alignItems: 'center',
  justifyContent: 'space-between',
}))

export const MemberCardContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  padding: theme.spacing(1),
  cursor: 'pointer',
  backgroundColor: theme.palette.grey[300],
  borderRadius: '50px',
  width: 'fit-content',
}))

export const UserListItemContainer = styled('li')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  padding: theme.spacing(1),
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: theme.palette.grey[300],
  },
}))
