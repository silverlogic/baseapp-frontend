import { forwardRef, useCallback } from 'react'

import {
  NativeSyntheticEvent,
  TextInput as NativeTextInput,
  Platform,
  TextInputContentSizeChangeEventData,
} from 'react-native'
import { NativeViewGestureHandler } from 'react-native-gesture-handler'
import { TextInput as PaperTextInput } from 'react-native-paper'
import { RenderProps } from 'react-native-paper/lib/typescript/components/TextInput/types'

import { useTheme } from '../../../../providers/native'
import { withNativeController } from '../../../../utils/native'
import View from '../../views/View'
import useSocialTextInput from './context/useSocialTextInput'
import { createStyles } from './styles'
import type { SocialTextInputProps } from './types'

const SocialTextInput = forwardRef<NativeTextInput, SocialTextInputProps>(
  (
    {
      children,
      lineHeight = 22,
      maxLines = 3,
      contentStyle = {},
      toolStyle = {},
      shouldUseBottomSheetSafeComponents = false,
      ...props
    },
    ref,
  ) => {
    const { isFocused, textHeight, setSocialInputState } = useSocialTextInput()
    const theme = useTheme()
    const styles = createStyles(theme, { isFocused, inputHeight: textHeight, lineHeight, maxLines })
    const isAndroid = Platform.OS === 'android'

    const onContentSizeChange = useCallback(
      (event: NativeSyntheticEvent<TextInputContentSizeChangeEventData>) => {
        const componentHeight = Math.floor(event.nativeEvent.contentSize.height)
        setSocialInputState({ textHeight: Math.min(maxLines * lineHeight, componentHeight) })
      },
      [lineHeight, maxLines, setSocialInputState],
    )

    const renderTextInput = useCallback(
      (renderProps: RenderProps) => {
        const textInput = (
          <NativeTextInput {...renderProps} onContentSizeChange={onContentSizeChange} />
        )

        if (shouldUseBottomSheetSafeComponents) {
          return (
            <NativeViewGestureHandler disallowInterruption>{textInput}</NativeViewGestureHandler>
          )
        }

        return textInput
      },
      [onContentSizeChange, shouldUseBottomSheetSafeComponents],
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

    // Here, we treat android and ios separately: The lineHeight property of NativeTextInput does not work on android (but on iOS).
    // As a workaround, we use PaperTextInput on android, for which this property works. But PaperTextInput sets a minimal height,
    // which can only be overwritten by setting the height explicitly. This does not work on iOS, since onContentSizeChange is not invoked
    // on iOS when a height is set.
    const textInput = isAndroid ? (
      <PaperTextInput
        contentStyle={styles.contentStyle}
        mode="outlined"
        multiline
        outlineStyle={styles.outlineStyle}
        placeholder="Comment..."
        placeholderTextColor={theme.colors.object.low}
        ref={ref}
        render={renderTextInput}
        style={styles.input}
        textColor={theme.colors.object.high}
        {...props}
        onBlur={handleBlur}
        onFocus={handleFocus}
      />
    ) : (
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
    )

    return (
      <View style={[contentStyle, styles.container]}>
        {/* TODO: Replies */}
        {textInput}
        <View style={[toolStyle, styles.toolContainer]}>{children}</View>
      </View>
    )
  },
)

export default withNativeController(SocialTextInput)
