import { PropsWithChildren } from 'react'

import { SingleChatDetailsFragment$key } from '../../../../../__generated__/SingleChatDetailsFragment.graphql'

export interface BodyProps extends PropsWithChildren {
  avatarSize?: number
  chatRoomRef: SingleChatDetailsFragment$key
}
