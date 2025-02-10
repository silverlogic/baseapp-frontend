import { FC } from 'react'

import { ChatRoomsQuery$data } from '../../../../__generated__/ChatRoomsQuery.graphql'
import { GroupChatMembersListProps } from '../../__shared__/GroupChatMembersList/types'
import { ProfileNode } from '../../__shared__/types'

export interface AddMembersDialogProps {
  allProfilesRef: ChatRoomsQuery$data
  onClose: VoidFunction
  handleSubmitSuccess: VoidFunction
  open: boolean
  profileId: string
  roomId?: string
  isPending: boolean
  GroupChatMembersList?: FC<GroupChatMembersListProps>
  GroupChatMembersListProps?: Partial<GroupChatMembersListProps>
  existingMembers: ProfileNode[]
}
