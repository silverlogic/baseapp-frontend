import { Theme } from '@baseapp-frontend/design-system/styles/native'

import { StyleSheet } from 'react-native'

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    bottomSheetContainer: {
      paddingHorizontal: 16,
      paddingVertical: 12,
      backgroundColor: theme.colors.surface.background,
    },
    background: {
      borderRadius: 0,
      backgroundColor: theme.colors.surface.background,
    },
  })
