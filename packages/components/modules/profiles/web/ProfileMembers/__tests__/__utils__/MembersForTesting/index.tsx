import { FC, Suspense } from 'react'

import { LoadingState } from '@baseapp-frontend/design-system/components/web/displays'

import { useLazyLoadQuery } from 'react-relay'

import { UserMembersListPaginationQuery as UserMembersListPaginationQueryType } from '../../../../../../../__generated__/UserMembersListPaginationQuery.graphql'
import { withComponentCompleteTestProviders } from '../../../../../../tests/web'
import { UserMembersListPaginationQuery } from '../../../../../common'
import { MembersListProps } from '../../../MembersList/types'
import ProfileMembers from '../../../index'

type MembersForTestingVariables = {
  profileId: string
  count?: number
  orderBy?: string
  q?: string
}

type MembersForTestingProps = {
  variables: MembersForTestingVariables
  MembersListProps?: Partial<MembersListProps>
}

const MembersForTestingComponent: FC<MembersForTestingProps> = ({ variables, ...props }) => {
  const data = useLazyLoadQuery<UserMembersListPaginationQueryType>(
    UserMembersListPaginationQuery,
    variables,
    {
      fetchPolicy: 'store-and-network',
    },
  )

  if (!data.profile) return null

  return <ProfileMembers userRef={data.profile} {...props} />
}

const MembersForTesting = withComponentCompleteTestProviders(
  ({ variables, ...props }: MembersForTestingProps) => (
    <Suspense fallback={<LoadingState />}>
      <MembersForTestingComponent variables={variables} {...props} />
    </Suspense>
  ),
)

export default MembersForTesting
