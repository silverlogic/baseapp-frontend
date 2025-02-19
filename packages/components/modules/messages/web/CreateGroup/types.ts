import { FC, PropsWithChildren } from 'react'

import { GroupChatMembersListProps } from '../__shared__/GroupChatMembersList/types'
import { ChatRoomsQuery$data } from '../../../../__generated__/ChatRoomsQuery.graphql'

export interface CreateGroupProps extends PropsWithChildren {
  allProfilesRef: ChatRoomsQuery$data
  GroupChatMembersList?: FC<GroupChatMembersListProps>
  GroupChatMembersListProps?: Partial<GroupChatMembersListProps>
  onValidSubmission: () => void
  onBackButtonClicked: () => void
}
