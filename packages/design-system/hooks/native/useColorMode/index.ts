import { useColorScheme } from 'react-native'

const useColorMode = (): 'light' | 'dark' => {
  const scheme = useColorScheme()
  return scheme === 'dark' ? 'dark' : 'light'
}

export default useColorMode
