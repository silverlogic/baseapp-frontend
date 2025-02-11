import { FC, Suspense } from 'react'

import { useCurrentProfile } from '@baseapp-frontend/authentication'
import { LoadingState as DefaultLoadingState } from '@baseapp-frontend/design-system/components/web/displays'

import { Typography } from '@mui/material'
import { useLazyLoadQuery } from 'react-relay'

import { UserMembersListPaginationQuery as UserMembersListPaginationQueryType } from '../../../../__generated__/UserMembersListPaginationQuery.graphql'
import { UserMembersListPaginationQuery } from '../../common'
import MembersList from './MembersList'
import { NUMBER_OF_MEMBERS_ON_FIRST_LOAD } from './constants'
import type { ProfileMembersProps, ProfileMembersSuspendedProps } from './types'

const ProfileMembers: FC<ProfileMembersProps> = ({ MembersListProps = {} }) => {
  const { currentProfile } = useCurrentProfile()

  const data = useLazyLoadQuery<UserMembersListPaginationQueryType>(
    UserMembersListPaginationQuery,
    {
      profileId: currentProfile?.id || '',
      count: NUMBER_OF_MEMBERS_ON_FIRST_LOAD,
      orderBy: 'status',
    },
  )

  if (!data.profile) return null
  return <MembersList userRef={data?.profile} {...MembersListProps} />
}

const ProfileMembersSuspended: FC<ProfileMembersSuspendedProps> = ({
  title = 'Members',
  subtitle,
  InitialLoadingState = DefaultLoadingState,
  ...props
}) => (
  <>
    <Typography component="h4" variant="h4" mb={1}>
      {title}
    </Typography>
    <Typography component="p" variant="body2" color="text.secondary" mb={4}>
      {subtitle}
    </Typography>
    <Suspense fallback={<InitialLoadingState />}>
      <ProfileMembers {...props} />
    </Suspense>
  </>
)

export default ProfileMembersSuspended
