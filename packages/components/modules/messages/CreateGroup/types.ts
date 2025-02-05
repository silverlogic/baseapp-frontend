import { FC, PropsWithChildren } from 'react'

import { ChatRoomsQuery$data } from '../../../__generated__/ChatRoomsQuery.graphql'
import { GroupChatMembersListProps } from '../__shared__/GroupChatMembersList/types'

export interface CreateGroupProps extends PropsWithChildren {
  allProfilesRef: ChatRoomsQuery$data
  GroupChatMembersList?: FC<GroupChatMembersListProps>
  GroupChatMembersListProps?: Partial<GroupChatMembersListProps>
  onValidSubmission: () => void
  onBackButtonClicked: () => void
}
