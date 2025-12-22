import { PropsWithChildren } from 'react'

import type {
  SocialTextInputEditVariablesProps,
  SocialTextInputReplyVariablesProps,
} from '@baseapp-frontend/design-system/components/native/inputs'

import { UseFormReturn } from 'react-hook-form'
import { StyleProp, ViewStyle } from 'react-native'

import { SocialUpsertForm } from '../../../__shared__/common'
import type { SocialInputDrawerProps, SocialInputDrawerType } from '../../../__shared__/native'

export interface CommentContainerProps extends PropsWithChildren {
  drawerStyle?: StyleProp<ViewStyle>
  targetObjectId: string
  SocialInputDrawer?: SocialInputDrawerType
  SocialInputDrawerProps?: SocialInputDrawerProps
  form: UseFormReturn<SocialUpsertForm, any, SocialUpsertForm>
  editVariables: SocialTextInputEditVariablesProps
  replyVariables: SocialTextInputReplyVariablesProps
  onReplySuccess?: (commentId: string) => void
}
