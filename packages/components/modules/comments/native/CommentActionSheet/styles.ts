import { Theme } from '@baseapp-frontend/design-system/styles/native'

import { StyleSheet } from 'react-native'

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    actionContainer: {
      paddingHorizontal: 16,
      paddingVertical: 12,
      gap: 4,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.surface.disabled,
    },
    destructiveContainer: {
      paddingHorizontal: 16,
      paddingVertical: 12,
      gap: 4,
      borderBottomWidth: 0,
    },
    pressable: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
      gap: 8,
      padding: 8,
    },
  })
