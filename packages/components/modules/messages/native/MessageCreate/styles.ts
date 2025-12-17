import { Theme } from '@baseapp-frontend/design-system/styles/native'

import { StyleSheet } from 'react-native'

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    contentContainer: {
      display: 'flex',
      flexDirection: 'column',
      flex: 1,
      backgroundColor: theme.colors.surface.background,
    },
  })
