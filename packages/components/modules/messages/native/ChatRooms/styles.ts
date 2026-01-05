import { Theme } from '@baseapp-frontend/design-system/styles/native'

import { StyleSheet } from 'react-native'

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.colors.surface.background,
      flexGrow: 1,
      flex: 1,
      position: 'relative',
    },
    chatRoomsContainer: {
      flexGrow: 1,
    },
    tabs: {
      justifyContent: 'space-evenly',
      gap: 0,
    },
  })
