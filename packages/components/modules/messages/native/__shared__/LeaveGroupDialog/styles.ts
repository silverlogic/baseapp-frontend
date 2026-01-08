import { Theme } from '@baseapp-frontend/design-system/styles/native'

import { StyleSheet } from 'react-native'

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    dialog: {
      borderRadius: 16,
    },
    confirmationContent: {
      paddingVertical: 0,
      paddingHorizontal: 24,
    },
    dialogActions: {
      padding: 24,
    },
    actionButtons: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      width: '100%',
    },
    cancelButton: {
      marginRight: 12,
    },
    titleContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      alignSelf: 'stretch',
      justifyContent: 'space-between',
      padding: 24,
      paddingRight: 12,
      borderRadius: 16,
    },
    title: {
      fontSize: 18,
      fontWeight: '700',
      color: theme.colors.object.high,
      flex: 1,
    },
  })
