import { StyleSheet } from 'react-native'

export const createStyles = () =>
  StyleSheet.create({
    notificationContentContainer: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      gap: 8,
      flex: 1,
    },
  })
