import { forwardRef, useCallback, useState } from 'react'

import { LayoutChangeEvent, TextInput as NativeTextInput, Pressable } from 'react-native'

import { useTheme } from '../../../../providers/native'
import { withNativeController } from '../../../../utils/native'
import { CloseIcon, ReplyIcon } from '../../icons'
import { Text } from '../../typographies'
import View from '../../views/View'
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
      editVariables = {},
      replyVariables = {},
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
        {editVariables?.isEditMode && (
          <View style={styles.editModeContainer}>
            <View style={styles.editModeLabelContainer}>
              <ReplyIcon width={20} height={20} />
              <Text style={styles.editModeLabel}>{editVariables?.label}</Text>
            </View>
            <Pressable onPress={editVariables?.onEditCancel}>
              <CloseIcon width={20} height={20} />
            </Pressable>
          </View>
        )}
        {replyVariables?.isReplyMode && (
          <View style={styles.replyModeContainer}>
            <View style={styles.replyModeLabelContainer}>
              <ReplyIcon width={20} height={20} />
              <Text style={styles.replyModeLabel}>
                {replyVariables?.label}
                <Text style={styles.replyModeTargetName}>{replyVariables?.targetName}</Text>
              </Text>
            </View>
            <Pressable onPress={replyVariables?.onReplyCancel}>
              <CloseIcon width={20} height={20} />
            </Pressable>
          </View>
        )}
        <NativeTextInput
          multiline
          onLayout={onLayout}
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
