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
      height: '100%',
    },
    contentContainer: {
      display: 'flex',
      flexDirection: 'column',
      flex: 1,
      paddingHorizontal: 16,
    },
  })
