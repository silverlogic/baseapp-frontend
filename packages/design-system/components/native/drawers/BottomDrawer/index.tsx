import { useCallback } from 'react'

import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
  BottomSheetView,
} from '@gorhom/bottom-sheet'

import { useTheme } from '../../../../providers/native'
import { createStyles } from './styles'
import { BottomDrawerProps } from './types'

const BottomDrawer = ({
  bottomDrawerRef,
  handleSheetChanges,
  snapPoints = ['30%'],
  children,
}: BottomDrawerProps) => {
  const theme = useTheme()
  const styles = createStyles(theme)

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop {...props} opacity={0.5} appearsOnIndex={0} disappearsOnIndex={-1} />
    ),
    [],
  )

  return (
    <BottomSheetModal
      ref={bottomDrawerRef}
      onChange={handleSheetChanges}
      snapPoints={snapPoints}
      style={styles.modal}
      backgroundStyle={styles.backgroundStyle}
      handleIndicatorStyle={styles.handleIndicatorStyle}
      handleStyle={styles.handleStyle}
      backdropComponent={renderBackdrop}
    >
      <BottomSheetView style={styles.contentContainer}>{children}</BottomSheetView>
    </BottomSheetModal>
  )
}

export default BottomDrawer
