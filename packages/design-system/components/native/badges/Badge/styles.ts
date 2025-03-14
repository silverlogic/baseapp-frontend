import { StyleSheet } from 'react-native'

import { Theme } from '../../../../styles/native'

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    badge: {
      position: 'absolute',
      top: -10,
      right: -10,
      backgroundColor: theme.colors.error.main,
      ...theme.typography.caption,
      color: theme.colors.error.contrast,
    },
  })
