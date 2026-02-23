import { StyleSheet } from 'react-native'

export const createStyles = () =>
  StyleSheet.create({
    container: {
      padding: 16,
    },
    profileCard: {
      alignItems: 'center',
      gap: 16,
      padding: 12,
    },

    profileInfo: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 4,
    },
  })
