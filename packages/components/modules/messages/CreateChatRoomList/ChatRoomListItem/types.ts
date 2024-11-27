import { Dispatch, SetStateAction } from 'react'

import { ProfileItemFragment$key } from '../../../../__generated__/ProfileItemFragment.graphql'

export interface ChatRoomListItemProps {
  profile: ProfileItemFragment$key
  setIsInExistingChatRoomsView: Dispatch<SetStateAction<boolean>>
}
