import { FC } from 'react'

import { VirtuosoProps } from 'react-virtuoso'

import { MessagesListFragment$key } from '../../../__generated__/MessagesListFragment.graphql'
import { MessagesGroupProps } from './MessagesGroup/types'

export interface MessagesListProps {
  roomRef: MessagesListFragment$key
  MessagesGroup?: FC<MessagesGroupProps>
  MessagesGroupProps?: Partial<MessagesGroupProps>
  VirtuosoProps?: Partial<VirtuosoProps<any, any>>
}
