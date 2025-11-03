import { StyleSheet } from 'react-native'

import { Theme } from '../../../../styles/native'

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    searchInput: {
      marginTop: 12,
      marginBottom: 12,
      backgroundColor: theme.colors.surface.active,
      height: 45,
    },
  })
