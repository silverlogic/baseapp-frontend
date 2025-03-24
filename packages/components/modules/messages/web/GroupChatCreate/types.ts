import { FC, PropsWithChildren } from 'react'

import { ChatRoomsQuery$data } from '../../../../__generated__/ChatRoomsQuery.graphql'
import { EditGroupTitleAndImageProps } from '../__shared__/EditGroupTitleAndImage/types'
import { GroupChatMembersListProps } from '../__shared__/GroupChatMembersList/types'
import { HeaderProps } from './Header/types'

export interface GroupChatCreateProps extends PropsWithChildren {
  allProfilesRef: ChatRoomsQuery$data
  EditGroupTitleAndImage?: FC<EditGroupTitleAndImageProps>
  EditGroupTitleAndImageProps?: Partial<EditGroupTitleAndImageProps>
  GroupChatMembersList?: FC<GroupChatMembersListProps>
  GroupChatMembersListProps?: Partial<GroupChatMembersListProps>
  Header?: FC<HeaderProps>
  HeaderProps?: Partial<HeaderProps>
  onValidSubmission: () => void
  onBackButtonClicked: () => void
}
