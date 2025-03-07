import { Theme } from '@baseapp-frontend/design-system/styles/native'

import { StyleSheet } from 'react-native'

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    badge: {
      position: 'absolute',
      top: -10,
      right: -10,
      backgroundColor: theme.colors.error.main,
      color: theme.colors.error.contrast,
      ...theme.typography.caption,
      fontWeight: 700,
      lineHeight: 20,
    },
  })
