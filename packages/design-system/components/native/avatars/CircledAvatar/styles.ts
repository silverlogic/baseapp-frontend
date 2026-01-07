import { StyleSheet } from 'react-native'

import { Theme } from '../../../../styles/native'

export const createStyles = (theme: Theme, size: number) =>
  StyleSheet.create({
    container: {
      display: 'flex',
      width: size + 16,
      height: size + 16,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '50%',
      borderColor: theme.colors.surface.border,
      borderWidth: 1,
    },
  })
