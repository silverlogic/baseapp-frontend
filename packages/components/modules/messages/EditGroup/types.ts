import { FC, PropsWithChildren } from 'react'

import { SearchbarProps } from '@baseapp-frontend/design-system'

import { PreloadedQuery } from 'react-relay'

import { ChatRoomsQuery$data } from '../../../__generated__/ChatRoomsQuery.graphql'
import { GroupDetailsQuery as GroupDetailsQueryType } from '../../../__generated__/GroupDetailsQuery.graphql'
import { ProfileCardProps } from '../__shared__/GroupChatMembersList/ProfileCard/types'
import { ProfilesListProps } from '../__shared__/GroupChatMembersList/ProfilesList/types'

export interface EditGroupProps extends PropsWithChildren {
  allProfilesRef: ChatRoomsQuery$data
  queryRef: PreloadedQuery<GroupDetailsQueryType>
  roomId: string | undefined
  onCancellation: () => void
  onRemovalFromGroup: () => void
  onValidSubmission: () => void
  Searchbar?: FC<SearchbarProps>
  SearchbarProps?: Partial<SearchbarProps>
  ProfileCard?: FC<ProfileCardProps>
  ProfileCardProps?: Partial<ProfileCardProps>
  MembersList?: FC<ProfilesListProps>
  MembersListProps?: Partial<ProfilesListProps>
  remotePatternsHostName?: string
}
