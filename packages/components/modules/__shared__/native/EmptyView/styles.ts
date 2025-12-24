import { Theme } from '@baseapp-frontend/design-system/styles/native'

import { StyleSheet } from 'react-native'

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 32,
      flexDirection: 'column',
      gap: 12,
      justifyContent: 'center',
      alignItems: 'center',
    },
    imageWrapper: {
      flex: 1,
      alignItems: 'center',
    },
    textWrapper: {
      flex: 1,
      maxWidth: '100%',
      padding: 16,
      justifyContent: 'flex-end',
      alignItems: 'center',
      gap: 10,
    },
    text: {
      color: theme.colors.object.low,
    },
  })
