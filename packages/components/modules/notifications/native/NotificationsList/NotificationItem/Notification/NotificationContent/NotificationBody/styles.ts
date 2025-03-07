import { Theme } from '@baseapp-frontend/design-system/styles/native'

import { StyleSheet } from 'react-native'

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    notificationBodyContainer: {
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
      borderRadius: 6,
      paddingVertical: 10,
      paddingHorizontal: 12,
      backgroundColor: theme.colors.surface.active,
      maxHeight: 64,
      width: '100%',
      maxWidth: '100%',
    },
  })
