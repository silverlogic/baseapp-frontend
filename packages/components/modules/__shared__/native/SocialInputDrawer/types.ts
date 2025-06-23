import { FC } from 'react'

import { UseFormReturn } from 'react-hook-form'
import { StyleProp, ViewStyle } from 'react-native'

import { SocialUpsertForm } from '../../common'
import type { SocialInputBoxProps } from '../SocialInputBox/types'

export interface SocialInputDrawerProps {
  DrawerHandle?: FC
  SocialInputBox?: FC<SocialInputBoxProps>
  SocialInputBoxProps?: Partial<SocialInputBoxProps>
  form: UseFormReturn<SocialUpsertForm, any, SocialUpsertForm>
  isLoading: boolean
  showHandle: boolean
  style?: StyleProp<ViewStyle>
  submit: VoidFunction
}
