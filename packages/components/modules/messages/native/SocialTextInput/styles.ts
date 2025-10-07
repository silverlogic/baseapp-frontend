import { Theme } from '@baseapp-frontend/design-system/styles/native'

import { StyleSheet } from 'react-native'

export const createStyles = (
  theme: Theme,
  {
    isFocused,
    lineHeight,
    maxLines,
  }: {
    isFocused: boolean
    lineHeight: number
    maxLines: number
  },
) =>
  StyleSheet.create({
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      gap: 8,
      padding: 12,
      borderRadius: 8,
      borderWidth: 1,
      borderStyle: 'solid',
      borderColor: isFocused ? theme.colors.object.high : theme.colors.surface.border,
    },
    toolContainer: {
      display: 'flex',
      alignItems: 'center',
      alignSelf: 'stretch',
      flexDirection: 'row',
      justifyContent: 'flex-end',
    },
    input: {
      width: '100%',
      padding: 0,
      maxHeight: lineHeight * maxLines,
      lineHeight,
      fontSize: 14,
      color: theme.colors.object.high,
    },
  })
