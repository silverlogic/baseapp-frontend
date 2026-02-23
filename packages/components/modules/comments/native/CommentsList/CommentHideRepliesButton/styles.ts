import { Theme } from '@baseapp-frontend/design-system/styles/native'

import { StyleSheet } from 'react-native'

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    hideRepliesButton: {
      backgroundColor: 'transparent',
      color: theme.colors.object.high,
    },
    hideRepliesButtonContainer: {
      color: theme.colors.object.high,
      backgroundColor: 'transparent',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
    },
    hideRepliesButtonText: {
      ...theme.typography.buttonSmall,
    },
  })
