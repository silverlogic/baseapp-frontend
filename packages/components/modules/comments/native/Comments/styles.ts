import { Theme } from '@baseapp-frontend/design-system/styles/native'

import { StyleSheet } from 'react-native'

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    transparent: {
      backgroundColor: 'transparent',
    },
    rootContainer: {
      display: 'flex',
      flexDirection: 'column',
      gap: 16,
      height: '100%',
    },
    contentContainer: {
      display: 'flex',
      flexDirection: 'column',
      flex: 1,
      paddingHorizontal: 16,
    },
    bottomDrawerActionContainer: {
      paddingHorizontal: 16,
      paddingVertical: 12,
      gap: 4,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.surface.disabled,
    },
    bottomDrawerDivider: {
      paddingHorizontal: 16,
      paddingVertical: 12,
      gap: 4,
      borderBottomWidth: 0,
    },
    bottomDrawerPressable: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
      gap: 8,
      padding: 8,
    },
  })
