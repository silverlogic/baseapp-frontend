import { forwardRef, useCallback, useState } from 'react'

import { View } from '@baseapp-frontend/design-system/components/native/views'
import { useTheme } from '@baseapp-frontend/design-system/providers/native'
import { withNativeController } from '@baseapp-frontend/design-system/utils/native'

import { LayoutChangeEvent, TextInput as NativeTextInput } from 'react-native'

import { createStyles } from './styles'
import type { SocialTextInputProps } from './types'

// TODO: abstract to baseapp-frontend package
const SocialTextInput = forwardRef<NativeTextInput, SocialTextInputProps>(
  ({ children, lineHeight = 22, maxLines = 3, toolStyle = {}, ...props }, ref) => {
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
      [lineHeight, maxLines, props.onTextHeightChange],
    )

    const handleBlur = useCallback(
      (args: any) => {
        props.onBlur?.(args)
        props.onFocusChange?.(false)
        setIsFocused(false)
      },
      [props.onBlur, props.onFocusChange, setIsFocused],
    )

    const handleFocus = useCallback(
      (args: any) => {
        props.onFocus?.(args)
        props.onFocusChange?.(true)
        setIsFocused(true)
      },
      [props.onFocus, props.onFocusChange, setIsFocused],
    )

    return (
      <View style={[styles.container]}>
        {/* TODO: Replies */}
        <NativeTextInput
          multiline
          onLayout={onLayout}
          placeholder="Message..."
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
