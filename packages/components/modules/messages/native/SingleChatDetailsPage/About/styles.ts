import { Theme } from '@baseapp-frontend/design-system/styles/native'

import { StyleSheet } from 'react-native'

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    aboutContainer: {
      display: 'flex',
      flexDirection: 'column',
    },
    aboutTextContainer: {
      alignItems: 'flex-start',
      padding: 16,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.surface.border,
    },
    bioContainer: {
      flexDirection: 'column',
      alignItems: 'flex-start',
      paddingVertical: 24,
      paddingHorizontal: 16,
      gap: 24,
    },
  })
