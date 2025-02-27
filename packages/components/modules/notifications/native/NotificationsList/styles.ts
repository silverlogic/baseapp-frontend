import { Theme } from '@baseapp-frontend/design-system/styles/native'

import { StyleSheet } from 'react-native'

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    headerContainer: {
      alignItems: 'center',
      borderBottomColor: theme.colors.surface.border,
      borderBottomWidth: 1,
      flexDirection: 'row',
      height: 64,
      justifyContent: 'space-between',
      padding: 16,
    },
    container: {
      height: '100%',
      flex: 1,
    },
  })
