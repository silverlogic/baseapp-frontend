import { StyleSheet } from 'react-native'

import { Theme } from '../../../../../styles/native'
import { DraweItemStylesOptions } from './types'

export const createStyles = (theme: Theme, { isActive }: DraweItemStylesOptions) =>
  StyleSheet.create({
    container: {
      alignItems: 'center',
      backgroundColor: isActive ? theme.colors.primary.overlay : 'transparent',
      borderRadius: 8,
      display: 'flex',
      gap: 16,
      flexDirection: 'row',
      height: 44,
      justifyContent: 'flex-start',
      paddingHorizontal: 12,
      width: '100%',
    },
  })
