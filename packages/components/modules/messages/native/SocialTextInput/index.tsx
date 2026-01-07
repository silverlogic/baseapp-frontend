import { forwardRef, useCallback, useState } from 'react'

import { View } from '@baseapp-frontend/design-system/components/native/views'
import { useTheme } from '@baseapp-frontend/design-system/providers/native'
import { withNativeController } from '@baseapp-frontend/design-system/utils/native'

import {
  LayoutChangeEvent,
  NativeSyntheticEvent,
  TextInput as NativeTextInput,
  TextInputFocusEventData,
} from 'react-native'

import { createStyles } from './styles'
import type { SocialTextInputProps } from './types'

const SocialTextInput = forwardRef<NativeTextInput, SocialTextInputProps>(
  (
    {
      children,
      containerStyle,
      lineHeight = 22,
      maxLines = 3,
      toolStyle = {},
      placeholder = 'Message...',
      ...props
    },
    ref,
  ) => {
    const [isFocused, setIsFocused] = useState<boolean>(false)
    const theme = useTheme()
    const styles = createStyles(theme, {
      isFocused: !!isFocused,
      lineHeight,
      maxLines,
    })

    const onLayout = useCallback(
      ({ nativeEvent }: LayoutChangeEvent) => {
        const componentHeight = Math.floor(nativeEvent.layout.height)
        props.onTextHeightChange?.(componentHeight)
      },
      [props.onTextHeightChange],
    )

    const handleBlur = useCallback(
      (args: NativeSyntheticEvent<TextInputFocusEventData>) => {
        props.onBlur?.(args)
        props.onFocusChange?.(false)
        setIsFocused(false)
      },
      [props.onBlur, props.onFocusChange],
    )

    const handleFocus = useCallback(
      (args: NativeSyntheticEvent<TextInputFocusEventData>) => {
        props.onFocus?.(args)
        props.onFocusChange?.(true)
        setIsFocused(true)
      },
      [props.onFocus, props.onFocusChange],
    )

    return (
      <View style={[styles.container, containerStyle]}>
        {/* TODO: Replies */}
        <NativeTextInput
          multiline
          onLayout={onLayout}
          placeholder={placeholder}
          placeholderTextColor={theme.colors.object.low}
          ref={ref}
          style={styles.input}
          {...props}
          onBlur={handleBlur}
          onFocus={handleFocus}
        />
        <View style={[toolStyle, styles.toolContainer]}>{children}</View>
      </View>
    )
  },
)

export default withNativeController(SocialTextInput)
