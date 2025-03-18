import { StyleSheet } from 'react-native'

import { Theme } from '../../../../styles/native'

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      alignItems: 'center',
      borderBottomColor: theme.colors.surface.border,
      borderBottomWidth: 1,
      flexDirection: 'row',
      height: 64,
      justifyContent: 'center',
      padding: 16,
    },
    title: {
      flex: 1,
      textAlign: 'center',
    },
    buttonContainer: {
      alignItems: 'center',
      width: 24,
    },
  })
