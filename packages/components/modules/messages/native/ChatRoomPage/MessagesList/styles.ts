import { Theme } from '@baseapp-frontend/design-system/styles/native'

import { StyleSheet } from 'react-native'

export const createStyles = (_theme: Theme) =>
  StyleSheet.create({
    flatListWrapper: {
      flex: 1,
    },
    flatList: {
      flex: 1,
      width: '100%',
    },
    flatListContentContainer: {
      width: '100%',
    },
  })
