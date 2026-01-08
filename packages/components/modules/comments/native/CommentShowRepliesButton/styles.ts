import { Theme } from '@baseapp-frontend/design-system/styles/native'

import { StyleSheet } from 'react-native'

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    showRepliesButton: {
      backgroundColor: 'transparent',
      color: theme.colors.object.high,
    },
    showRepliesButtonContainer: {
      color: theme.colors.object.high,
      backgroundColor: 'transparent',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
    },
    showRepliesButtonText: {
      color: theme.colors.object.high,
      fontFamily: 'PublicSans_700Bold',
      fontSize: 13,
    },
  })
