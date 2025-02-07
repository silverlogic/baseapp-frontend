import { FC } from 'react'

import { useRouter } from 'expo-router'
import { Platform } from 'react-native'
import { Appbar } from 'react-native-paper'

import { useTheme } from '../../../../providers/native'
import { createStyles } from './styles'
import { AppBarProps } from './types'

const AppBar: FC<AppBarProps> = ({ title, goBack, headerStyle, statusBarHeight }) => {
  const router = useRouter()
  const theme = useTheme()

  const styles = createStyles(theme)

  const isAndroid = Platform.OS === 'android'

  const titleStyle = [styles.title, isAndroid && styles.titleAndroid]

  const handleGoBack = () => {
    if (goBack) {
      goBack()
    } else {
      router.back()
    }
  }

  return (
    <Appbar.Header style={[styles.container, headerStyle]} statusBarHeight={statusBarHeight}>
      <Appbar.BackAction
        onPress={handleGoBack}
        size={16}
        color={theme.colors.object.low}
        style={isAndroid && styles.backActionAndroid}
      />
      <Appbar.Content title={title} titleStyle={titleStyle} />
    </Appbar.Header>
  )
}

export default AppBar
