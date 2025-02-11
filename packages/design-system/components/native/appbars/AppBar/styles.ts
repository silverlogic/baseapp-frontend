import { StyleSheet } from 'react-native'

import { Theme } from '../../../../styles/native'

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.colors.surface.background,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.surface.border,
      paddingHorizontal: 8,
      paddingBottom: 0,
      elevation: 0,
    },
    title: {
      alignSelf: 'center',
      color: theme.colors.object.high,
      overflow: 'hidden',
      textAlign: 'center',
      fontSize: 14,
      fontStyle: 'normal',
      fontWeight: 600,
      lineHeight: 22,
    },
    titleAndroid: {
      marginLeft: -8,
    },
    backActionAndroid: {
      position: 'absolute',
      left: 8,
    },
  })
