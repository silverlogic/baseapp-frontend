import { Theme } from '@baseapp-frontend/design-system/styles/native'

import { StyleSheet } from 'react-native'

export const createStyles = (_theme: Theme) =>
  StyleSheet.create({
    wrapper: {
      flexDirection: 'row',
      marginVertical: 4,
    },
    avatarContainer: {
      width: 32,
      marginRight: 12,
      display: 'flex',
      justifyContent: 'flex-end',
    },
    messageWrapper: {
      maxWidth: '80%',
      flexDirection: 'column',
      alignItems: 'flex-start',
    },
    ownWrapper: {
      alignSelf: 'flex-end',
      marginRight: 16,
    },
    ownMessageAlign: {
      alignItems: 'flex-end',
    },
    receivedMessageAlign: {
      alignItems: 'flex-start',
    },
    receivedWrapper: {
      alignSelf: 'flex-start',
      display: 'flex',
      justifyContent: 'center',
      alignContent: 'center',
      alignItems: 'center',
      marginLeft: 16,
    },
  })
