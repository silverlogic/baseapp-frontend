import { FC, PropsWithChildren } from 'react'

<<<<<<< HEAD:packages/components/modules/messages/web/CreateGroup/types.ts
import { SearchbarProps } from '@baseapp-frontend/design-system/components/web/inputs'

import { ChatRoomsQuery$data } from '../../../../__generated__/ChatRoomsQuery.graphql'
import { ProfileCardProps } from '../__shared__/GroupChatMembersList/ProfileCard/types'
import { ProfilesListProps } from '../__shared__/GroupChatMembersList/ProfilesList/types'
=======
import { ChatRoomsQuery$data } from '../../../__generated__/ChatRoomsQuery.graphql'
import { GroupChatMembersListProps } from '../__shared__/GroupChatMembersList/types'
>>>>>>> f82cdb0 (feat: add members to existing group):packages/components/modules/messages/CreateGroup/types.ts

export interface CreateGroupProps extends PropsWithChildren {
  allProfilesRef: ChatRoomsQuery$data
  GroupChatMembersList?: FC<GroupChatMembersListProps>
  GroupChatMembersListProps?: Partial<GroupChatMembersListProps>
  onValidSubmission: () => void
  onBackButtonClicked: () => void
}
