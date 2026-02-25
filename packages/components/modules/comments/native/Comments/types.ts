import { FC, PropsWithChildren } from 'react'

import { StyleProp, ViewStyle } from 'react-native'

import type { CommentsFragment$key } from '../../../../__generated__/CommentsFragment.graphql'
import type { SocialInputDrawerProps, SocialInputDrawerType } from '../../../__shared__/native'
import type { CommentsListProps } from '../CommentsList/types'

export interface CommentsProps extends PropsWithChildren {
  subscriptionsEnabled?: boolean
  target: CommentsFragment$key
  CommentsList?: FC<CommentsListProps>
  CommentsListProps?: Partial<CommentsListProps>
  SocialInputDrawer?: SocialInputDrawerType
  SocialInputDrawerProps?: SocialInputDrawerProps
  drawerStyle?: StyleProp<ViewStyle>
  maxThreadDepth?: number
}
