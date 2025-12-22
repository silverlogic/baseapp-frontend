import { Theme } from '@baseapp-frontend/design-system/styles/native'

import { StyleSheet } from 'react-native'

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    rootContainer: {
      backgroundColor: 'transparent',
      display: 'flex',
      alignSelf: 'stretch',
      flexDirection: 'row',
      paddingVertical: 8,
      paddingHorizontal: 12,
      gap: 12,
    },
    avatarContainer: {
      backgroundColor: 'transparent',
      alignSelf: 'flex-start',
    },
    bodyContainer: {
      backgroundColor: 'transparent',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      gap: 2,
      flexGrow: 1,
      flexShrink: 1,
    },
    footerContainer: {
      backgroundColor: 'transparent',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      alignSelf: 'stretch',
      paddingTop: 10,
    },
    buttonContainer: {
      backgroundColor: 'transparent',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 12,
    },
    timestampContainer: {
      backgroundColor: 'transparent',
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
    threadDepthContainer: {
      flexDirection: 'row',
      backgroundColor: 'transparent',
    },
    threadDepthDivider: {
      width: 2,
      backgroundColor: theme.colors.surface.disabled,
      marginRight: 12,
      alignSelf: 'stretch',
    },
  })
