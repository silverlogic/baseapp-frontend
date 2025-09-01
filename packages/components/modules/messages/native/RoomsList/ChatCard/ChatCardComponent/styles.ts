import { Theme } from '@baseapp-frontend/design-system/styles/native'

import { StyleSheet } from 'react-native'

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    profileCard: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
      paddingVertical: 12,
    },
    profileInfo: {
      flex: 1,
    },
    lastMessageContainer: {
      flexDirection: 'row',
      gap: 4,
    },
    profileCounterContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      padding: 4,
    },
    lastMessageText: {
      color: theme.colors.object.low,
    },
    profileCounter: {
      backgroundColor: theme.colors.error.main,
      width: 20,
      height: 20,
      borderRadius: 12,
      justifyContent: 'center',
      alignItems: 'center',
    },
    profileCounterText: {
      color: theme.colors.error.contrast,
    },
  })
