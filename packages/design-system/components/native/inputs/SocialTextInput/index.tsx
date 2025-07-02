import { forwardRef, useCallback, useState } from 'react'

import {
  NativeSyntheticEvent,
  TextInput as NativeTextInput,
  TextInputContentSizeChangeEventData,
} from 'react-native'

import { useTheme } from '../../../../providers/native'
import { withNativeController } from '../../../../utils/native'
import View from '../../views/View'
import { createStyles } from './styles'
import type { SocialTextInputProps } from './types'

const SocialTextInput = forwardRef<NativeTextInput, SocialTextInputProps>(
  (
    { children, lineHeight = 22, maxLines = 3, contentStyle = {}, toolStyle = {}, ...props },
    ref,
  ) => {
    const [isFocused, setIsFocused] = useState<boolean>(false)
    const theme = useTheme()
    const styles = createStyles(theme, {
      isFocused: !!isFocused,
      lineHeight,
      maxLines,
    })

    const onContentSizeChange = useCallback(
      (event: NativeSyntheticEvent<TextInputContentSizeChangeEventData>) => {
        const componentHeight = Math.floor(event.nativeEvent.contentSize.height)
        props.onTextHeightChange?.(Math.min(maxLines * lineHeight, componentHeight))
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
      <View style={[contentStyle, styles.container]}>
        {/* TODO: Replies */}
        <NativeTextInput
          multiline
          onContentSizeChange={onContentSizeChange}
          placeholder="Comment..."
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
