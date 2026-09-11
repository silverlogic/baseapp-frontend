import { Theme } from '@baseapp-frontend/design-system/styles/native'

import { StyleSheet } from 'react-native'

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    listContainer: {
      backgroundColor: 'transparent',
      flex: 1,
      alignSelf: 'stretch',
    },
    threadDepthContainer: {
      flexDirection: 'row',
      backgroundColor: 'transparent',
      flex: 1,
      alignSelf: 'stretch',
    },
    threadDepthDivider: {
      width: 2,
      backgroundColor: theme.colors.surface.disabled,
      marginRight: 12,
      alignSelf: 'stretch',
    },
  })
