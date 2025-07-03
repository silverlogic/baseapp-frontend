import { StyleSheet } from 'react-native'

export const createStyles = () =>
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
  })
