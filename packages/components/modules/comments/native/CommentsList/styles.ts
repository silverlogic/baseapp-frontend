import { StyleSheet } from 'react-native'

export const createStyles = () =>
  StyleSheet.create({
    listContainer: {
      backgroundColor: 'transparent',
    },
    bottomDrawerActionContainer: {
      paddingHorizontal: 16,
      paddingVertical: 12,
      gap: 4,
      borderBottomWidth: 1,
      borderBottomColor: 'surface.disabled',
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
  })
