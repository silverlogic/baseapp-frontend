import { Theme } from '@baseapp-frontend/design-system/styles/native'

import { StyleSheet } from 'react-native'

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    OptionsContainer: {
      display: 'flex',
      flexDirection: 'column',
    },
    OptionsTextContainer: {
      alignItems: 'flex-start',
      padding: 16,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.surface.border,
    },
    buttonsContainer: {
      flexDirection: 'column',
      alignItems: 'flex-start',
      paddingVertical: 24,
      paddingHorizontal: 16,
      gap: 24,
    },
    buttons: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-end',
      minWidth: 64,
      gap: 8,
      padding: 0,
    },
    leaveGroupButton: {
      color: theme.colors.error.main,
    },
  })
