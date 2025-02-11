import type { FC } from 'react'

import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
} from 'react-native-reanimated'

import { useTheme } from '../../../../providers/native'
import View from '../View'
import { createStyles } from './styles'
import { ParallaxScrollViewProps } from './types'

const HEADER_HEIGHT = 250

const ParallaxScrollView: FC<ParallaxScrollViewProps> = ({ children, headerImage }) => {
  const scrollRef = useAnimatedRef<Animated.ScrollView>()
  const scrollOffset = useScrollViewOffset(scrollRef)
  const theme = useTheme()

  const styles = createStyles(theme)

  const headerAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: interpolate(
          scrollOffset.value,
          [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
          [-HEADER_HEIGHT / 2, 0, HEADER_HEIGHT * 0.75],
        ),
      },
      {
        scale: interpolate(scrollOffset.value, [-HEADER_HEIGHT, 0, HEADER_HEIGHT], [2, 1, 1]),
      },
    ],
  }))

  return (
    <View style={styles.container}>
      <Animated.ScrollView ref={scrollRef} scrollEventThrottle={16}>
        <Animated.View style={[styles.header, headerAnimatedStyle]}>{headerImage}</Animated.View>
        <View style={styles.content}>{children}</View>
      </Animated.ScrollView>
    </View>
  )
}

export default ParallaxScrollView
