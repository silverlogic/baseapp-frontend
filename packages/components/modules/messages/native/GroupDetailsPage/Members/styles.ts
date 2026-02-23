import { Theme } from '@baseapp-frontend/design-system/styles/native'

import { StyleSheet } from 'react-native'

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    membersContainer: {
      display: 'flex',
      flexDirection: 'column',
    },
    membersTextContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 16,
      gap: 8,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.surface.border,
    },
    addMemberContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 12,
      gap: 12,
    },
    addMemberButton: {
      position: 'relative',
      alignItems: 'center',
      alignSelf: 'baseline',
      width: 48,
      height: 48,
      shadowOffset: {
        width: 0,
        height: 0,
      },
      shadowOpacity: 0,
      shadowRadius: 0,
      elevation: 0,
    },
  })
