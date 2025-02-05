import { FC, PropsWithChildren } from 'react'

import { PreloadedQuery } from 'react-relay'

import { ChatRoomsQuery$data } from '../../../__generated__/ChatRoomsQuery.graphql'
import { GroupDetailsQuery as GroupDetailsQueryType } from '../../../__generated__/GroupDetailsQuery.graphql'
import { GroupChatMembersListProps } from '../__shared__/GroupChatMembersList/types'

export interface EditGroupProps extends PropsWithChildren {
  allProfilesRef: ChatRoomsQuery$data
  queryRef: PreloadedQuery<GroupDetailsQueryType>
  roomId: string | undefined
  onCancellation: () => void
  onRemovalFromGroup: () => void
  onValidSubmission: () => void
  GroupChatMembersList?: FC<GroupChatMembersListProps>
  GroupChatMembersListProps?: Partial<GroupChatMembersListProps>
  remotePatternsHostName?: string
}
