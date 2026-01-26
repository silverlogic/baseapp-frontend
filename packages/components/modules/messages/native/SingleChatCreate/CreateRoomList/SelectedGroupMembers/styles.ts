import { Theme } from '@baseapp-frontend/design-system/styles/native'

import { StyleSheet } from 'react-native'

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    avatarCloseButtonContainer: {
      position: 'absolute',
      top: 0,
      right: 0,
      zIndex: 1,
      borderRadius: 500,
      backgroundColor: theme.colors.object.low,
      width: 26,
      height: 26,
      alignItems: 'center',
      justifyContent: 'center',
      borderColor: theme.colors.surface.default,
      borderWidth: 2,
    },
    titleContainer: {
      paddingVertical: 16,
      paddingHorizontal: 4,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.surface.border,
    },
  })
