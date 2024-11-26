import { Dispatch, PropsWithChildren, SetStateAction } from 'react'

import { Disposable, UseMutationConfig } from 'react-relay'

import { CreateChatRoomMutation } from '../../../../__generated__/CreateChatRoomMutation.graphql'
import { UseCurrentProfile } from '../../../profiles/context/CurrentProfileProvider/types'

export interface ChatRoomListCardProps extends PropsWithChildren {
  item: any
  setIsInChatRoom: Dispatch<SetStateAction<boolean>>
  setIsInExistingChatRoomsView: Dispatch<SetStateAction<boolean>>
  isMutationInFlight: boolean
  commit: (config: UseMutationConfig<CreateChatRoomMutation>) => Disposable
  currentProfile: UseCurrentProfile
}
