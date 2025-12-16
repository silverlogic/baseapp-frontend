import { FC, ForwardRefExoticComponent, RefAttributes } from 'react'

import { TextInput } from 'react-native'

import { DrawerProps } from './Drawer/types'
import { PlaceholderProps } from './Placeholder/types'

export interface UseTextInputProperties {
  isFocused: boolean
  onFocusChange: (focused: boolean) => void
  textHeight: number
  onTextHeightChange: (height: number) => void
  keyboardHeight: number
}

export interface SocialInputDrawerType {
  Drawer: ForwardRefExoticComponent<DrawerProps & RefAttributes<TextInput>>
  Placeholder: FC<PlaceholderProps>
  useTextInputProperties: () => UseTextInputProperties
}

export interface SocialInputDrawerProps {
  DrawerProps: Partial<DrawerProps>
  PlaceholderProps: Partial<PlaceholderProps>
}
