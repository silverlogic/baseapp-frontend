import { StyleSheet } from 'react-native'

import { Theme } from '../../../../styles/native'

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
      justifyContent: 'space-between',
    },
    input: {
      width: '100%',
      padding: 0,
      maxHeight: lineHeight * maxLines,
      lineHeight,
      fontSize: 14,
      color: theme.colors.object.high,
    },
    editModeContainer: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%',
      padding: 8,
      borderRadius: 8,
      backgroundColor: theme.colors.surface.active,
    },
    editModeLabelContainer: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
      backgroundColor: 'transparent',
    },
    editModeLabel: {
      fontSize: 14,
      lineHeight: lineHeight ?? 22,
      color: theme.colors.object.low,
    },
  })
