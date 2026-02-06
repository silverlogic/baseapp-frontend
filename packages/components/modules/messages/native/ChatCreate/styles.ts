import { Theme } from '@baseapp-frontend/design-system/styles/native'

import { StyleSheet } from 'react-native'

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.colors.surface.background,
      flex: 1,
      flexGrow: 1,
      paddingHorizontal: 12,
    },
  })
