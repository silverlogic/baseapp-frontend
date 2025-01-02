import { FC } from 'react'

import { PreloadedQuery } from 'react-relay'
import { VirtuosoProps } from 'react-virtuoso'

import { ChatRoomsQuery$data } from '../../../__generated__/ChatRoomsQuery.graphql'
import { GroupDetailsQuery as GroupDetailsQueryType } from '../../../__generated__/GroupDetailsQuery.graphql'
import { MembersListFragment$data } from '../../../__generated__/MembersListFragment.graphql'
import { ProfileCardProps } from './ProfileCard/types'

type GroupMembers = NonNullable<MembersListFragment$data['participants']>
export type GroupMembersEdge = GroupMembers['edges'][number]

export type GroupDetailsProps = {
  allProfilesRef: ChatRoomsQuery$data
  onBackButtonClicked: () => {}
  onEditButtonClicked: () => {}
  queryRef: PreloadedQuery<GroupDetailsQueryType>
  ProfileCard?: FC<ProfileCardProps>
  ProfileCardProps?: Partial<ProfileCardProps>
  VirtuosoProps?: Partial<VirtuosoProps<any, any>>
}
