import { Theme } from '@baseapp-frontend/design-system/styles/native'

import { StyleSheet } from 'react-native'

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.colors.surface.background,
      flex: 1,
      paddingTop: 0,
      paddingHorizontal: 16,
      paddingBottom: 16,
    },
    headerContainer: {
      position: 'relative',
      alignItems: 'center',
      marginBottom: 48,
    },
    bannerImage: {
      width: '100%',
      borderRadius: 8,
      backgroundColor: theme.colors.surface.disabled,
      height: 120,
    },
    profileImage: {
      position: 'absolute',
      bottom: -50,
      width: 96,
      height: 96,
      borderRadius: 50,
      borderWidth: 2,
      borderColor: theme.colors.surface.background,
    },
    infoContainer: {
      marginTop: 24,
      alignItems: 'center',
      gap: 24,
    },
    statsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      width: '100%',
    },
    nameContainer: {
      alignItems: 'center',
    },
    statContainer: {
      alignItems: 'center',
      flex: 1,
    },
    leftBorder: {
      borderLeftWidth: 1,
      borderColor: theme.colors.surface.border,
      borderStyle: 'solid',
    },
    biography: {
      width: '100%',
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      gap: 12,
      width: '100%',
    },
    button: {
      flex: 1,
    },
    buttonContent: {
      paddingLeft: -16,
    },
  })
