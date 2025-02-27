import { Theme } from '@baseapp-frontend/design-system/styles/native'

import { StyleSheet } from 'react-native'

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    headerContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 16,
      paddingLeft: 20,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.surface.border,
    },
    container: {
      height: '100%',
      flex: 1,
    },
  })
