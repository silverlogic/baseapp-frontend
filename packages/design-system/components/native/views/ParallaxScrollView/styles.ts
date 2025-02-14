import { StyleSheet } from 'react-native'

import { Theme } from '../../../../styles/native'

export const createStyles = ({ colors }: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    header: {
      height: 250,
      overflow: 'hidden',
      backgroundColor: colors.surface.background,
    },
    content: {
      flex: 1,
      padding: 32,
      gap: 16,
      overflow: 'hidden',
    },
  })
