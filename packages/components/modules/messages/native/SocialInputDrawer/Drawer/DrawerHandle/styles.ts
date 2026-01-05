import { Theme, transparent } from '@baseapp-frontend/design-system/styles/native'

import { StyleSheet } from 'react-native'

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    handleContainer: {
      height: 26,
      borderColor: transparent.light[20],
      borderTopLeftRadius: 12,
      borderTopRightRadius: 12,
      borderTopWidth: 1,
      borderLeftWidth: 1,
      borderRightWidth: 1,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    draggable: {
      width: 64,
      height: 6,
      backgroundColor: theme.colors.object.disabled,
      borderRadius: 12,
    },
  })
