import { StyleSheet } from 'react-native'

export const createStyles = () =>
  StyleSheet.create({
    notificationRootContainer: {
      width: '100%',
      maxWidth: '100%',
      position: 'relative',
      display: 'flex',
      flexDirection: 'row',
      padding: 20,
      gap: 16,
    },
  })
