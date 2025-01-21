  import { FC, Suspense } from 'react'

import { useCurrentProfile } from '@baseapp-frontend/authentication'
import { LoadingState as DefaultLoadingState } from '@baseapp-frontend/design-system'

import { Typography } from '@mui/material'
import { useLazyLoadQuery } from 'react-relay'

import { UserMembersListPaginationQuery as IUserMembersListPaginationQuery } from '../../../__generated__/UserMembersListPaginationQuery.graphql'
import { UserMembersListPaginationQuery } from '../graphql/queries/UserMembersList'
import DefaultMemberItem from './MemberItem'
import MembersList from './MembersList'
import { NUMBER_OF_MEMBERS_ON_FIRST_LOAD } from './constants'
import { UserMembersProps, UserMembersSuspendedProps } from './types'

const Members: FC<UserMembersProps> = ({
  MemberItem,
  LoadingState,
  LoadingStateProps,
  membersContainerHeight,
}) => {
  const { currentProfile } = useCurrentProfile()

  const data = useLazyLoadQuery<IUserMembersListPaginationQuery>(UserMembersListPaginationQuery, {
    profileId: currentProfile?.id || '',
    count: NUMBER_OF_MEMBERS_ON_FIRST_LOAD,
    orderBy: 'status',
  })

  if (!data.profile) return null
  return (
    <MembersList
      userRef={data?.profile}
      MemberItem={MemberItem}
      LoadingState={LoadingState}
      LoadingStateProps={LoadingStateProps}
      membersContainerHeight={membersContainerHeight}
    />
  )
}

const MembersSuspended: FC<UserMembersSuspendedProps> = ({
  title = 'Members',
  subtitle,
  MemberItem = DefaultMemberItem,
  LoadingState = DefaultLoadingState,
  LoadingStateProps = {},
  InitialLoadingState = DefaultLoadingState,
  membersContainerHeight = 400,
}) => (
    <>
    <Typography component="h4" variant="h4" mb={1}>
      {title}
    </Typography>
    <Typography component="p" variant="body2" color="text.secondary" mb={4}>
      {subtitle}
    </Typography>
    <Suspense fallback={<InitialLoadingState />}>
      <Members
        MemberItem={MemberItem}
        LoadingState={LoadingState}
        LoadingStateProps={LoadingStateProps}
        membersContainerHeight={membersContainerHeight}
      />
    </Suspense>
  </>
  )

export default MembersSuspended
