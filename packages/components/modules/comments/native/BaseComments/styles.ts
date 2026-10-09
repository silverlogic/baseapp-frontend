import { StyleSheet } from 'react-native'

export const createStyles = () =>
  StyleSheet.create({
    transparent: {
      backgroundColor: 'transparent',
    },
    rootContainer: {
      display: 'flex',
      flexDirection: 'column',
      gap: 16,
      flex: 1,
      alignSelf: 'stretch',
    },
    contentContainer: {
      display: 'flex',
      flexDirection: 'column',
      flex: 1,
    },
    disabledContentContainer: {
      flexGrow: 1,
      paddingHorizontal: 16,
    },
  })
