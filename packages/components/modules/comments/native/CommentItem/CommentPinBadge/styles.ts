import { Theme } from '@baseapp-frontend/design-system/styles/native'

import { StyleSheet } from 'react-native'

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    pinContainer: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
    },
    pinIcon: {
      width: 13,
      height: 13,
      color: theme.colors.primary.main,
    },
    pinText: {
      fontSize: 12,
      color: theme.colors.object.disabled,
    },
  })
