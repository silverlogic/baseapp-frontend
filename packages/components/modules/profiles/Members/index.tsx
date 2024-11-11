import { FC, Suspense } from 'react'

import { LoadingState as DefaultLoadingState } from '@baseapp-frontend/design-system'

import { Typography } from '@mui/material'
import { useLazyLoadQuery } from 'react-relay'

import { UserMembersListPaginationQuery as IUserMembersListPaginationQuery } from '../../../__generated__/UserMembersListPaginationQuery.graphql'
import { UserMembersListPaginationQuery } from '../graphql/queries/UserMembersList'
import DefaultMemberItem from './MemberItem'
import MembersList from './MembersList'
import { NUMBER_OF_MEMBERS_ON_FIRST_LOAD } from './constants'
import { MemberItemSkeleton } from './styled'
import { UserMembersProps, UserMembersSuspendedProps } from './types'

const DefaultInitialLoadingState: FC = () => (
  <>
    {Array.from({ length: NUMBER_OF_MEMBERS_ON_FIRST_LOAD }).map((_, index) => (
      <MemberItemSkeleton
        key={index} // eslint-disable-line react/no-array-index-key
        variant="rectangular"
        sx={{ mb: 0.5 }}
      />
    ))}
  </>
)

const Members: FC<UserMembersProps> = ({
  MemberItem,
  LoadingState,
  LoadingStateProps,
  membersContainerHeight,
}) => {
  const data = useLazyLoadQuery<IUserMembersListPaginationQuery>(UserMembersListPaginationQuery, {
    count: NUMBER_OF_MEMBERS_ON_FIRST_LOAD,
    orderByStatus: 'custom',
  })
  if (!data.me) return null
  return (
    <MembersList
      meRef={data?.me}
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
  InitialLoadingState = DefaultInitialLoadingState,
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
