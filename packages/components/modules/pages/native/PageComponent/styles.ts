import { Theme } from '@baseapp-frontend/design-system/styles/native'

import { StyleSheet } from 'react-native'

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    // Horizontal padding is applied by the enclosing Comments scroll container, so the page
    // content only owns its vertical rhythm here.
    container: {
      paddingTop: 16,
      paddingBottom: 16,
    },
    title: {
      marginBottom: 16,
    },
    body: {
      color: theme.colors.object.high,
    },
  })
