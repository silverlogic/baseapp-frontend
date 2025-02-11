import { FC } from 'react'

import { Text as PaperText } from 'react-native-paper'

import { useTheme } from '../../../../providers/native'
import { createStyles } from './styles'
import { TextProps } from './types'

const Text: FC<TextProps> = ({ color = 'high', variant = 'body1', style, ...props }) => {
  const theme = useTheme()
  const styles = createStyles(theme, { color, variant })

  return <PaperText style={[styles.text, styles.typography, style]} {...props} />
}

export default Text
