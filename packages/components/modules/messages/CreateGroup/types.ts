import { FC, PropsWithChildren } from 'react'

import { SearchbarProps } from '@baseapp-frontend/design-system'

import { ChatRoomsQuery$data } from '../../../__generated__/ChatRoomsQuery.graphql'
import { ProfileCardProps } from '../__shared__/GroupChatMembersList/ProfileCard/types'
import { ProfilesListProps } from '../__shared__/GroupChatMembersList/ProfilesList/types'

export interface CreateGroupProps extends PropsWithChildren {
  allProfilesRef: ChatRoomsQuery$data
  Searchbar?: FC<SearchbarProps>
  SearchbarProps?: Partial<SearchbarProps>
  ProfileCard?: FC<ProfileCardProps>
  ProfileCardProps?: Partial<ProfileCardProps>
  ConnectionsList?: FC<ProfilesListProps>
  ConnectionsListProps?: Partial<ProfilesListProps>
  MembersList?: FC<ProfilesListProps>
  MembersListProps?: Partial<ProfilesListProps>
  onValidSubmission: () => void
  onBackButtonClicked: () => void
}
