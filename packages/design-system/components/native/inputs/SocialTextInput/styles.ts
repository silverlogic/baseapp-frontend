import { StyleSheet } from 'react-native'

import { Theme } from '../../../../styles/native'

export const createStyles = (theme: Theme, isFocused: boolean) =>
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
    },
    contentStyle: {
      lineHeight: 22,
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
  })
