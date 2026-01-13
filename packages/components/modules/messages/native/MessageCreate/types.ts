import { PropsWithChildren } from 'react'

import { StyleProp, ViewStyle } from 'react-native'

import { SocialInputDrawerProps, SocialInputDrawerType } from '../SocialInputDrawer/types'

export interface CommentCreateProps extends PropsWithChildren {
  drawerStyle?: StyleProp<ViewStyle>
  targetObjectId: string
  SocialInputDrawer?: SocialInputDrawerType
  SocialInputDrawerProps?: SocialInputDrawerProps
}
