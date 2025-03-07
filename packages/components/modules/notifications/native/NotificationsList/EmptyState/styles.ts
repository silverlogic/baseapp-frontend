import { Theme } from '@baseapp-frontend/design-system/styles/native'

import { StyleSheet } from 'react-native'

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      height: '100%',
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.colors.surface.background,
      gap: 12,
      paddingBottom: 74,
    },
    subText: {
      color: theme.colors.object.low,
    },
    text: {
      gap: 4,
      alignItems: 'center',
    },
  })
