import { Dispatch, SetStateAction } from 'react'

import { Disposable, UseMutationConfig } from 'react-relay'

import { CreateChatRoomMutation } from '../../../../__generated__/CreateChatRoomMutation.graphql'
import { UseCurrentProfile } from '../../../profiles/context/CurrentProfileProvider/types'

export interface ChatRoomListCardProps {
  item: any
  setIsInExistingChatRoomsView: Dispatch<SetStateAction<boolean>>
  isMutationInFlight: boolean
  commit: (config: UseMutationConfig<CreateChatRoomMutation>) => Disposable
  currentProfile: UseCurrentProfile
}
