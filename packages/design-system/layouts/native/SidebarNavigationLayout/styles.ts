import { StyleSheet } from 'react-native'

import { Theme } from '../../../styles/native'

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    tabList: {
      height: 74,
      paddingHorizontal: 16,
      paddingVertical: 12,
      backgroundColor: theme.colors.surface.background,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-evenly',
    },
    tab: {
      alignItems: 'center',
      gap: 4,
      display: 'flex',
      justifyContent: 'center',
      paddingHorizontal: 12,
      height: 50,
    },
    tabText: {
      textAlign: 'center',
    },
  })
