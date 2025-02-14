import { StyleSheet } from 'react-native'

import { Theme, typography } from '../../../../styles/native'
import { TextStylesOptions } from './types'

export const createStyles = (theme: Theme, { color, variant }: TextStylesOptions) =>
  StyleSheet.create({
    text: {
      color: theme.colors.object[color],
    },
    typography: {
      ...typography[variant],
    },
  })
