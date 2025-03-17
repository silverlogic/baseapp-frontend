import { Theme } from '@baseapp-frontend/design-system/styles/native'

import { StyleSheet } from 'react-native'

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    headerTextContainer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-start',
    },
    textWithBadgeContainer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
      maxWidth: '100%',
    },
    headerContainer: {
      display: 'flex',
      width: '100%',
      maxWidth: '100%',
    },
    badge: {
      backgroundColor: theme.colors.error.main,
    },
  })
