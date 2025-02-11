import { StyleSheet } from 'react-native'

import { Theme } from '../../../../styles/native'

export const createStyles = ({ colors }: Theme) =>
  StyleSheet.create({
    container: {
      backgroundColor: colors.surface.background,
    },
  })
