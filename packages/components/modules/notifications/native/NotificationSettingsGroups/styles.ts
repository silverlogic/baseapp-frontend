import { Theme } from '@baseapp-frontend/design-system/styles/native'

import { StyleSheet } from 'react-native'

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      gap: 16,
    },
    group: {
      borderBottomColor: theme.colors.surface.border,
      borderBottomWidth: 1,
      gap: 4,
      paddingBottom: 12,
    },
    channel: {
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
      minHeight: 40,
    },
  })
