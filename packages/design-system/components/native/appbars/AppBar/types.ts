import type { StyleProp } from 'react-native/Libraries/StyleSheet/StyleSheet'
import type { ViewStyle } from 'react-native/Libraries/StyleSheet/StyleSheetTypes'

export type AppBarProps = {
  title: string
  goBack?: () => void
  headerStyle?: StyleProp<ViewStyle>
  statusBarHeight?: number | undefined
}
