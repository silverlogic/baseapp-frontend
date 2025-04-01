import { StyleSheet } from 'react-native'

import { Theme } from '../../../../styles/native'

export const createStyles = (
  theme: Theme,
  {
    isFocused,
    inputHeight,
    lineHeight,
    maxLines,
  }: {
    isFocused: boolean
    inputHeight: number
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
      alignSelf: 'stretch',
      textAlignVertical: 'top',
      height: inputHeight,
    },
    contentStyle: {
      lineHeight,
      fontSize: 14,
      paddingHorizontal: 0,
      paddingVertical: 0,
      paddingLeft: 0,
      paddingRight: 0,
      paddingTop: 0,
      paddingBottom: 0,
    },
    outlineStyle: {
      display: 'none',
    },
    iosInput: {
      width: '100%',
      padding: 0,
      maxHeight: lineHeight * maxLines,
      lineHeight, // This property does not work on android directly
      // and requires the react-native-paper workaround from above
      fontSize: 14,
    },
  })
