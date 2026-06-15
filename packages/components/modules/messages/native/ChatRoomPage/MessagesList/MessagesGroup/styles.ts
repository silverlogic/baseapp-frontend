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
    dateGroup: {
      alignSelf: 'center',
      backgroundColor: theme.colors.surface.active,
      borderRadius: 4,
      paddingVertical: 4,
      paddingHorizontal: 8,
      marginTop: 16,
      marginBottom: 8,
      textAlign: 'center',
    },
  })
