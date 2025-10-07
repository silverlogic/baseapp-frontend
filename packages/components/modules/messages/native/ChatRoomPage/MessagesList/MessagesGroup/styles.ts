import { Theme } from '@baseapp-frontend/design-system/styles/native'

import { StyleSheet } from 'react-native'

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    unreadMessagesWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    newMessagesText: {
      color: theme.colors.error.main,
      margin: 16,
    },
    unreadRedLine: {
      flex: 1,
      height: 1,
      backgroundColor: theme.colors.error.main,
    },
  })
