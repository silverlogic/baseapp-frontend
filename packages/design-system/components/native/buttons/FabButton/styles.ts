import { Theme } from '@baseapp-frontend/design-system/styles/native'

import { StyleSheet } from 'react-native'

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    button: {
      position: 'absolute',
      right: 0,
      bottom: 16,
      backgroundColor: theme.colors.primary.main,
      width: 56,
      height: 56,
      borderRadius: 500,
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 10,
      shadowOffset: {
        width: 0,
        height: 8,
      },
      shadowOpacity: 0.24,
      shadowRadius: 8,
      elevation: 8,
    },
  })
