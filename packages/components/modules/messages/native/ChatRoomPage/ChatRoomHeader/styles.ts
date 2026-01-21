import { StyleSheet } from 'react-native'

export const createStyles = () =>
  StyleSheet.create({
    profileCard: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
      paddingVertical: 12,
      flexGrow: 1,
      marginLeft: 16,
    },
    profileImage: {
      width: 32,
      height: 32,
      borderRadius: 16,
    },
    profileInfo: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-start',
      height: 32,
    },
  })
