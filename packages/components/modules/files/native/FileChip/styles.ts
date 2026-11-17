import { Theme } from '@baseapp-frontend/design-system/styles/native'

import { StyleSheet } from 'react-native'

export const THUMBNAIL_SIZE = 36

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
      width: 200,
      paddingVertical: 6,
      paddingLeft: 6,
      paddingRight: 4,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: theme.colors.surface.border,
      backgroundColor: theme.colors.surface.default,
    },
    pressArea: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
      flex: 1,
      minWidth: 0,
    },
    thumbnail: {
      width: THUMBNAIL_SIZE,
      height: THUMBNAIL_SIZE,
      borderRadius: 6,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.colors.surface.active,
      overflow: 'hidden',
    },
    body: {
      flex: 1,
      minWidth: 0,
      gap: 2,
      backgroundColor: 'transparent',
    },
  })
