import { useMemo } from 'react'

import { useCurrentProfile } from '@baseapp-frontend/authentication'

import { graphql, useSubscription } from 'react-relay'

// TODO: check if this is used and delete
const MessageCountUpdateSubscription = graphql`
  subscription useMessageCountUpdateSubscription($profileId: ID!) {
    chatRoomOnMessagesCountUpdate(profileId: $profileId) {
      profile {
        id
        chatRooms {
          totalCount
          edges {
            node {
              id
              unreadMessages {
                count
                markedUnread
              }
              allMessages {
                edges {
                  node {
                    id
                    isRead
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`

export const useMessageCountUpdate = () => {
  const { currentProfile: profile } = useCurrentProfile()

  const config = useMemo(
    () => ({
      subscription: MessageCountUpdateSubscription,
      onError: console.error,
      variables: {
        profileId: profile?.id,
      },
    }),
    [profile?.id],
  )

  return useSubscription(config)
}
