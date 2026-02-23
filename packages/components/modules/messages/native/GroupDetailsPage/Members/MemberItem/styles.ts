import { Theme } from '@baseapp-frontend/design-system/styles/native'

import { StyleSheet } from 'react-native'

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    memberItemContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 12,
      paddingTop: 12,
      gap: 12,
    },
    pathContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    dotElement: {
      height: 6,
      width: 6,
      borderRadius: 3,
      backgroundColor: theme.colors.object.disabled,
    },
  })
