import { Theme } from '@baseapp-frontend/design-system/styles/native'

import { StyleSheet } from 'react-native'

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    dialog: {
      borderRadius: 16,
    },
    dialogActions: {
      paddingTop: 0,
      paddingHorizontal: 24,
      paddingBottom: 24,
    },
    actionButtons: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      gap: 12,
    },
    titleContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      alignSelf: 'stretch',
      justifyContent: 'space-between',
      paddingRight: 12,
      borderRadius: 16,
    },
    title: {
      color: theme.colors.object.high,
      flex: 1,
      ...theme.typography.h5,
    },
  })
