import { StyleSheet } from 'react-native'

import type { Theme } from '../../../../styles/native'

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    modal: {
      borderRadius: 16,
      borderWidth: 1,
      borderColor: theme.colors.surface.disabled,
      backgroundColor: theme.colors.surface.background,
    },
    backgroundStyle: {
      backgroundColor: theme.colors.surface.background,
    },
    contentContainer: {
      position: 'relative',
      width: '100%',
    },
    handleIndicatorStyle: {
      backgroundColor: theme.colors.object.disabled,
      width: 64,
      height: 6,
    },
    handleStyle: {
      backgroundColor: 'transparent',
    },
  })
