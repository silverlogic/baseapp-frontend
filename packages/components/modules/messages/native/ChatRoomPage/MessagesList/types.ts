import { FC } from 'react'

import { MessagesListFragment$key } from '../../../../../__generated__/MessagesListFragment.graphql'
import { MessagesGroupProps } from './MessagesGroup/types'

export interface MessagesListProps {
  roomRef: MessagesListFragment$key
  MessagesGroup?: FC<MessagesGroupProps>
  MessagesGroupProps?: Partial<MessagesGroupProps>
}
