import { Theme } from '@baseapp-frontend/design-system/styles/native'

import { StyleSheet } from 'react-native'

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    messageBubble: {
      paddingVertical: 8,
      paddingHorizontal: 12,
      borderRadius: 16,
      overflow: 'hidden',
      fontSize: 16,
      color: '#000',
    },
    ownBubble: {
      backgroundColor: theme.colors.surface.active,
      color: theme.colors.object.high,
    },
    receivedBubble: {
      backgroundColor: theme.colors.object.high,
      color: theme.colors.object.contrast,
    },
  })
