import { Theme } from '@baseapp-frontend/design-system/styles/native'

import { StyleSheet } from 'react-native'

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      height: 30,
      width: '100%',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 16,
    },
    line: {
      height: 1,
      width: 10,
      backgroundColor: theme.colors.surface.disabled,
      flexGrow: 1,
    },
    text: {
      alignItems: 'center',
    },
  })
