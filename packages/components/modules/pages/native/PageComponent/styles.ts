import { Theme } from '@baseapp-frontend/design-system/styles/native'

import { StyleSheet } from 'react-native'

import { CONTENT_HORIZONTAL_PADDING } from './constants'

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flexGrow: 1,
      paddingHorizontal: CONTENT_HORIZONTAL_PADDING,
      paddingTop: 16,
      paddingBottom: 24,
    },
    title: {
      marginBottom: 16,
    },
    body: {
      color: theme.colors.object.high,
    },
  })
