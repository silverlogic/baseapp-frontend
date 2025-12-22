import { Theme } from '@baseapp-frontend/design-system/styles/native'

import { StyleSheet } from 'react-native'

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    menuStyle: {
      width: 154,
    },
    menuContentStyle: {
      elevation: 0,
      borderWidth: 1,
      borderColor: 'rgba(0,0,0,0.1)',
      borderRadius: 12,
    },
    deleteTitleStyle: {
      color: theme.colors.error.main,
    },
  })
