import { StyleSheet } from 'react-native'

import { Theme } from '../../../../styles/native'
import { SizeStylesOptions } from './types'

export const createStyles = ({ colors }: Theme, { width, height }: SizeStylesOptions) =>
  StyleSheet.create({
    container: {
      alignItems: 'center',
      borderColor: colors.surface.active,
      borderRadius: 50,
      borderWidth: 2,
      height: height + 4,
      justifyContent: 'center',
      overflow: 'hidden',
      width: width + 4,
    },
    image: {
      borderRadius: 50,
      height,
      width,
    },
    imageFallbackState: {
      backgroundColor: colors.surface.active,
      borderRadius: 50,
      height,
      width,
    },
  })
