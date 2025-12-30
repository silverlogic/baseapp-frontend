import { StyleSheet } from 'react-native'

import { Theme } from '../../../../styles/native'

export const createStyles = (theme: Theme, isSelected: boolean) =>
  StyleSheet.create({
    baseTabContainer: {
      flexGrow: 1,
      borderBottomColor: theme.colors.object.low,
      borderBottomWidth: isSelected ? 2 : 0,
    },
  })
