import { FC, PropsWithChildren } from 'react'

import { PreloadedQuery } from 'react-relay'

import { GroupChatMembersListProps } from '../__shared__/GroupChatMembersList/types'
import { ChatRoomsQuery$data } from '../../../../__generated__/ChatRoomsQuery.graphql'
import { GroupDetailsQuery } from '../../../../__generated__/GroupDetailsQuery.graphql'

export interface EditGroupProps extends PropsWithChildren {
  allProfilesRef: ChatRoomsQuery$data
  queryRef: PreloadedQuery<GroupDetailsQuery>
  roomId: string | undefined
  onCancellation: () => void
  onRemovalFromGroup: () => void
  onValidSubmission: () => void
  GroupChatMembersList?: FC<GroupChatMembersListProps>
  GroupChatMembersListProps?: Partial<GroupChatMembersListProps>
  remotePatternsHostName?: string
}
