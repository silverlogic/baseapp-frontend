import { Platform } from 'react-native'

export const isMobilePlatform = () => {
  if (!Platform) return false

  return Platform.OS === 'ios' || Platform.OS === 'android'
}
