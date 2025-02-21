import { Theme } from '@baseapp-frontend/design-system/styles/native'

import { StyleSheet } from 'react-native'

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    scrollViewContainer: {
      padding: 0,
      flex: 1,
    },
    container: {
      backgroundColor: theme.colors.surface.background,
      padding: 16,
      paddingVertical: 24,
      flex: 1,
    },
    titleContainer: {
      gap: 8,
    },
    headerContainer: {
      position: 'relative',
      alignItems: 'center',
      marginBottom: 48,
    },
    bannerContainer: {
      position: 'relative',
      width: '100%',
      height: 120,
      borderRadius: 8,
    },
    bannerImage: {
      width: '100%',
      borderRadius: 8,
      height: 120,
      flex: 1,
      backgroundColor: theme.colors.surface.disabled,
    },
    profileContainer: {
      position: 'absolute',
      bottom: -50,
      width: 96,
      height: 96,
      borderRadius: 50,
      alignItems: 'center',
      justifyContent: 'center',
      borderColor: theme.colors.surface.active,
      borderWidth: 1,
    },
    profileImage: {
      borderRadius: 50,
      width: 96,
      height: 96,
      borderWidth: 2,
      borderColor: theme.colors.surface.background,
      position: 'relative',
    },
    editIconContainer: {
      position: 'absolute',
      alignItems: 'center',
      justifyContent: 'center',
      bottom: 8,
      right: 8,
      backgroundColor: theme.colors.object.disabled,
      borderWidth: 1,
      borderColor: theme.colors.surface.background,
      borderRadius: 50,
      height: 32,
      width: 32,
    },
    formContainer: {
      gap: 32,
      paddingTop: 32,
    },
    formGroup: {
      gap: 24,
    },
    input: {
      borderColor: theme.colors.surface.border,
      borderRadius: 8,
    },
    bioInput: {
      height: 120,
    },
    saveButtonContainer: {
      alignSelf: 'flex-end',
    },
    saveButton: {
      backgroundColor: theme.colors.object.high,
      minWidth: 120,
    },
    saveButtonLabel: {
      color: theme.colors.object.contrast,
    },
    saveButtonDisabled: {
      backgroundColor: theme.colors.object.disabled,
      minWidth: 120,
    },
    errorBorder: {
      borderColor: theme.colors.error.main,
      borderWidth: 2,
    },
  })
