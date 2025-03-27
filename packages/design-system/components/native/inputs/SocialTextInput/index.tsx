import { forwardRef } from 'react'

import {
  NativeSyntheticEvent,
  TextInput as NativeTextInput,
  TextInputContentSizeChangeEventData,
} from 'react-native'
import { NativeViewGestureHandler } from 'react-native-gesture-handler'
import { TextInput as PaperTextInput } from 'react-native-paper'

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
    const styles = createStyles(theme, isFocused)
    const onContentSizeChange = (
      event: NativeSyntheticEvent<TextInputContentSizeChangeEventData>,
    ) => {
      const componentHeight = Math.floor(event.nativeEvent.contentSize.height)
      setSocialInputState({ textHeight: Math.min(maxLines * lineHeight, componentHeight) })
    }

    return (
      <View style={[contentStyle, styles.container]}>
        {/* TODO: Replies */}
        <PaperTextInput
          contentStyle={styles.contentStyle}
          mode="outlined"
          multiline
          outlineStyle={styles.outlineStyle}
          placeholder="Comment..."
          placeholderTextColor={theme.colors.object.low}
          ref={ref}
          render={(renderProps) => (
            <NativeViewGestureHandler disallowInterruption>
              <NativeTextInput
                {...renderProps}
                onContentSizeChange={onContentSizeChange}
                onBlur={() => setSocialInputState({ isFocused: false })}
                onFocus={() => setSocialInputState({ isFocused: true })}
              />
            </NativeViewGestureHandler>
          )}
          style={{ ...styles.input, height: textHeight }}
          textColor={theme.colors.object.high}
          {...props}
        />
        <View style={[toolStyle, styles.toolContainer]}>{children}</View>
      </View>
    )
  },
)

export default withNativeController(SocialTextInput)
