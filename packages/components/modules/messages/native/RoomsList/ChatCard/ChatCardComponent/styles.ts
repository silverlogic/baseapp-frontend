import { Theme } from '@baseapp-frontend/design-system/styles/native'

import { StyleSheet } from 'react-native'

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    profileCard: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: 12,
      paddingHorizontal: 12,
      gap: 12,
    },
    // With `renderAvatar`: the row's padding and the gap belong to the chat control, so the
    // only area outside it is the avatar column itself.
    splitCard: {
      flexDirection: 'row',
      alignItems: 'stretch',
    },
    avatarColumn: {
      justifyContent: 'center',
      paddingLeft: 12,
    },
    cardPressArea: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 12,
      paddingVertical: 12,
      paddingLeft: 12,
      paddingRight: 12,
    },
    profileInfo: {
      flexGrow: 1,
      flexShrink: 1,
      overflow: 'hidden',
    },
    lastMessageContainer: {
      flexDirection: 'row',
      gap: 4,
    },
    profileCounterContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 12,
      minWidth: 24,
      flexShrink: 0,
    },
    lastMessageText: {
      color: theme.colors.object.low,
    },
  })
