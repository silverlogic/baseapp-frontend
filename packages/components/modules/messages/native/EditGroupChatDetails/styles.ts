import { Theme } from '@baseapp-frontend/design-system/styles/native'

import { StyleSheet } from 'react-native'

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.colors.surface.background,
      flex: 1,
      flexGrow: 1,
      padding: 16,
      alignItems: 'center',
      gap: 16,
    },
    avatarOuterContainer: {
      width: 144,
      height: 144,
      borderWidth: 1,
      borderColor: theme.colors.surface.border,
      borderRadius: 500,
      alignItems: 'center',
      justifyContent: 'center',
    },
    avatarContainer: {
      width: 128,
      height: 128,
      borderRadius: 500,
      backgroundColor: theme.colors.surface.active,
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputContainer: {
      flexGrow: 1,
      marginTop: 12,
      width: '100%',
    },
    input: {
      width: '100%',
    },
    selectedImage: {
      borderRadius: 500,
      width: 128,
      height: 128,
      borderColor: theme.colors.surface.background,
      position: 'relative',
    },
    errorBorder: {
      borderColor: theme.colors.error.main,
      borderWidth: 2,
    },
  })
