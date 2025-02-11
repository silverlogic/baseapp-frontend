import { FC } from 'react'

import { ActivityIndicator } from 'react-native-paper'

import View from '../../views/View'
import { styles } from './styles'
import { LoadingScreenProps } from './types'

const LoadingScreen: FC<LoadingScreenProps> = (props) => (
  <View style={styles.container}>
    <ActivityIndicator animating size="large" {...props} />
  </View>
)

export default LoadingScreen
