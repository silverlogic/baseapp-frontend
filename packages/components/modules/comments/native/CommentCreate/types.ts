import { PropsWithChildren } from 'react'

import { StyleProp, ViewStyle } from 'react-native'

import type { SocialInputDrawerProps, SocialInputDrawerType } from '../../../__shared__/native'

export interface CommentCreateProps extends PropsWithChildren {
  drawerStyle?: StyleProp<ViewStyle>
  targetObjectId: string
  SocialInputDrawer?: SocialInputDrawerType
  SocialInputDrawerProps?: SocialInputDrawerProps
}
