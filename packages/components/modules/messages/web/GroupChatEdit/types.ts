import { FC, PropsWithChildren } from 'react'

import { PreloadedQuery } from 'react-relay'

import { ChatRoomsQuery$data } from '../../../../__generated__/ChatRoomsQuery.graphql'
import { GroupDetailsQuery } from '../../../../__generated__/GroupDetailsQuery.graphql'
import { GroupChatMembersListProps } from '../__shared__/GroupChatMembersList/types'
import { HeaderProps } from './Header/types'

export interface GroupChatEditProps extends PropsWithChildren {
  allProfilesRef: ChatRoomsQuery$data
  Header?: FC<HeaderProps>
  HeaderProps?: Partial<HeaderProps>
  GroupChatMembersList?: FC<GroupChatMembersListProps>
  GroupChatMembersListProps?: Partial<GroupChatMembersListProps>
  onCancellation: () => void
  onRemovalFromGroup: () => void
  onValidSubmission: () => void
  queryRef: PreloadedQuery<GroupDetailsQuery>
  remotePatternsHostName?: string
  roomId: string | undefined
}
