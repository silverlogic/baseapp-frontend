import { forwardRef, useCallback } from 'react'

import {
  NativeSyntheticEvent,
  TextInput as NativeTextInput,
  TextInputContentSizeChangeEventData,
} from 'react-native'

import { useTheme } from '../../../../providers/native'
import { withNativeController } from '../../../../utils/native'
import View from '../../views/View'
import useSocialTextInput from './context/useSocialTextInput'
import { createStyles } from './styles'
import type { SocialTextInputProps } from './types'

const SocialTextInput = forwardRef<NativeTextInput, SocialTextInputProps>(
  (
    { children, lineHeight = 22, maxLines = 3, contentStyle = {}, toolStyle = {}, ...props },
    ref,
  ) => {
    const { isFocused, textHeight, setSocialInputState } = useSocialTextInput()
    const theme = useTheme()
    const styles = createStyles(theme, {
      isFocused: !!isFocused,
      inputHeight: textHeight || 0,
      lineHeight,
      maxLines,
    })

    const onContentSizeChange = useCallback(
      (event: NativeSyntheticEvent<TextInputContentSizeChangeEventData>) => {
        const componentHeight = Math.floor(event.nativeEvent.contentSize.height)
        setSocialInputState({ textHeight: Math.min(maxLines * lineHeight, componentHeight) })
      },
      [lineHeight, maxLines, setSocialInputState],
    )

    const handleBlur = useCallback(
      (args: any) => {
        props.onBlur?.(args)
        setSocialInputState({ isFocused: false })
      },
      [props.onBlur, setSocialInputState],
    )

    const handleFocus = useCallback(
      (args: any) => {
        props.onFocus?.(args)
        setSocialInputState({ isFocused: true })
      },
      [props.onFocus, setSocialInputState],
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
          style={styles.iosInput}
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
