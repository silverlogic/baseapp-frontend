import { FC, PropsWithChildren, ReactElement } from 'react'

import { StyleProp, ViewStyle } from 'react-native'

import type { CommentsFragment$key } from '../../../../__generated__/CommentsFragment.graphql'
import type { SocialInputDrawerProps, SocialInputDrawerType } from '../../../__shared__/native'
import type { CommentsListProps } from '../CommentsList/types'

export interface BaseCommentsProps extends PropsWithChildren {
  subscriptionsEnabled?: boolean
  target: CommentsFragment$key
  CommentsList?: FC<CommentsListProps>
  CommentsListProps?: Partial<CommentsListProps>
  SocialInputDrawer?: SocialInputDrawerType
  SocialInputDrawerProps?: SocialInputDrawerProps
  drawerStyle?: StyleProp<ViewStyle>
  maxThreadDepth?: number
  /**
   * Content rendered above the comment thread as the scrollable list header (e.g. a page body).
   * Scrolls together with the comments. When comments are disabled it is rendered inside a
   * scroll view alongside `children`.
   */
  ListHeaderComponent?: ReactElement | null
}
