import { useLazyLoadQuery } from 'react-relay'

import { UserMembersListPaginationQuery as IUserMembersListPaginationQuery } from '../../../../../../__generated__/UserMembersListPaginationQuery.graphql'
import withProviders from '../../../../../../__test_utils__/withProviders'
import { UserMembersListPaginationQuery } from '../../../../graphql/queries/UserMembersList'
import { NUMBER_OF_MEMBERS_ON_FIRST_LOAD } from '../../../constants'
import Members from '../../../index'
import { UserMembersProps } from '../../../types'
import { mockResolvers } from '../../__mocks__/profileComponentResolvers'

const MembersForTesting = (props?: Partial<UserMembersProps>) => {
  const data = useLazyLoadQuery<IUserMembersListPaginationQuery>(UserMembersListPaginationQuery, {
    profileId: mockResolvers?.ProfileComponentFragment?.id || '',
    count: NUMBER_OF_MEMBERS_ON_FIRST_LOAD,
    orderBy: 'status',
  })

  return <Members {...props} />
}

export default withProviders(MembersForTesting)
