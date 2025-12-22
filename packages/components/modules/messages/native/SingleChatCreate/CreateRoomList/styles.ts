import { Theme } from '@baseapp-frontend/design-system/styles/native'

import { StyleSheet } from 'react-native'

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    flatListWrapper: {
      flex: 1,
    },
    contentContainer: {
      paddingBottom: 16,
      width: '100%',
    },
    flatList: {
      flex: 1,
      width: '100%',
      backgroundColor: theme.colors.surface.background,
    },
  })
