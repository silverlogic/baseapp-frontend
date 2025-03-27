import { forwardRef, useCallback, useRef } from 'react'

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
      showHandle,
      style = {},
      submit,
    },
    ref,
  ) => {
    const bottomSheetRef = useRef<BottomSheet>(null)

    const handleSheetChange = useCallback((index: number) => {
      console.log('handleSheetChange', index)
    }, [])
    const handleAnimate = useCallback(
      (index: number, to: number) => {
        console.log('handleAnimate', index, to)
        if (to === 0) {
          if (ref && 'current' in ref) ref.current?.blur()
          bottomSheetRef.current?.snapToIndex(1)
        } else if (to === 2) {
          if (ref && 'current' in ref) ref.current?.focus()
          bottomSheetRef.current?.snapToIndex(1)
        }
      },
      [ref, bottomSheetRef.current],
    )

    const styles = createStyles()

    return (
      <BottomSheet
        ref={bottomSheetRef}
        index={1}
        snapPoints={[80, 200]}
        onChange={handleSheetChange}
        onAnimate={handleAnimate}
        enableContentPanningGesture={false}
        keyboardBlurBehavior="restore"
        handleComponent={showHandle ? DrawerHandle : null}
        backgroundStyle={styles.background}
      >
        <BottomSheetView style={[styles.bottomSheetContainer, style]}>
          <SocialInputBox
            form={form}
            isLoading={isLoading}
            ref={ref}
            submit={submit}
            {...SocialInputBoxProps}
          />
        </BottomSheetView>
      </BottomSheet>
    )
  },
)

export default SocialInputDrawer
