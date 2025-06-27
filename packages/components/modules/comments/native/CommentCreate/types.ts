import { FC, PropsWithChildren } from 'react'

import { StyleProp, ViewStyle } from 'react-native'

import type { SocialInputDrawerProps } from '../../../__shared__/native'

export interface CommentCreateProps extends PropsWithChildren {
  drawerStyle?: StyleProp<ViewStyle>
  targetObjectId: string
  SocialInputDrawer?: FC<SocialInputDrawerProps>
  SocialInputDrawerProps?: Partial<SocialInputDrawerProps>
}
