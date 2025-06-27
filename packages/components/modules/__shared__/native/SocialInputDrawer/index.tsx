import { forwardRef, useCallback, useRef } from 'react'

import { View } from '@baseapp-frontend/design-system/components/native/views'
import { useTheme } from '@baseapp-frontend/design-system/providers/native'

import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet'
import { TextInput as NativeTextInput } from 'react-native'

import DefaultSocialInputBox from '../SocialInputBox'
import DefaultDrawerHandle from './DrawerHandle'
import { createStyles } from './styles'
import { SocialInputDrawerProps } from './types'

const SocialInputDrawer = forwardRef<NativeTextInput, SocialInputDrawerProps>(
  (
    {
      DrawerHandle = DefaultDrawerHandle,
      SocialInputBox = DefaultSocialInputBox,
      SocialInputBoxProps = {},
      form,
      isLoading,
      keyboardHeight = 0,
      showHandle,
      style = {},
      submit,
    },
    ref,
  ) => {
    const bottomSheetRef = useRef<BottomSheet>(null)
    const theme = useTheme()

    const handleSheetChange = useCallback(
      (index: number) => {
        if (index !== 1) {
          bottomSheetRef.current?.snapToIndex(1)
          if (index === 0) {
            if (ref && 'current' in ref) ref.current?.blur()
          } else if (index === 2) {
            if (ref && 'current' in ref) ref.current?.focus()
          }
        }
      },
      [ref, bottomSheetRef],
    )

    const handleAnimate = useCallback(
      (from: number, to: number) => {
        if (to !== 1) {
          bottomSheetRef.current?.snapToIndex(1)
        }
        if (to === 0) {
          if (ref && 'current' in ref) ref.current?.blur()
        } else if (to === 2) {
          if (ref && 'current' in ref) ref.current?.focus()
        }
      },
      [ref, bottomSheetRef],
    )

    const styles = createStyles(theme)
    return (
      <BottomSheet
        ref={bottomSheetRef}
        index={1}
        snapPoints={[80 + keyboardHeight, 200 + keyboardHeight]}
        onChange={handleSheetChange}
        onAnimate={handleAnimate}
        handleComponent={showHandle ? DrawerHandle : null}
        backgroundStyle={styles.background}
      >
        <BottomSheetView style={[styles.bottomSheetContainer, style]}>
          <SocialInputBox
            form={form}
            isLoading={isLoading}
            ref={ref}
            shouldUseBottomSheetSafeComponents
            submit={submit}
            {...SocialInputBoxProps}
          />
          {
            // The next view extends the bottom sheet by the height of the keyboard
            // so that the SocialInputBox is not hidden by the keyboard
          }
          <View style={{ height: keyboardHeight }} />
        </BottomSheetView>
      </BottomSheet>
    )
  },
)

export default SocialInputDrawer
