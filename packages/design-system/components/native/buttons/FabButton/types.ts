import { Ionicons } from '@expo/vector-icons'
import type { TouchableOpacityProps } from 'react-native'

export interface FabButtonProps extends TouchableOpacityProps {
  iconName: keyof typeof Ionicons.glyphMap
  iconSize?: number
  iconColor?: string
}
