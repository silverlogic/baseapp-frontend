import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  // with InfiniteScrollerView's 24px footer this clears the FabButton (56px, 16px up)
  contentContainer: {
    paddingBottom: 48,
  },
})
