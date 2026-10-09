import { Theme } from '@baseapp-frontend/design-system/styles/native'

import { StyleSheet } from 'react-native'

export const createStyles = (theme: Theme, percent: number) =>
  StyleSheet.create({
    track: {
      height: 4,
      marginTop: 4,
      borderRadius: 2,
      overflow: 'hidden',
      backgroundColor: theme.colors.surface.active,
    },
    bar: {
      height: 4,
      width: `${percent}%`,
      backgroundColor: theme.colors.primary.main,
    },
    error: {
      color: theme.colors.error.main,
    },
    action: {
      padding: 4,
    },
  })
