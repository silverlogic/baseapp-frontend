import { useColorScheme } from 'react-native'

const useColorMode = () => useColorScheme() ?? 'light'

export default useColorMode
