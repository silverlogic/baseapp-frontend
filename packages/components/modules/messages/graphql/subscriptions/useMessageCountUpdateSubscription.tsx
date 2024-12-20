import { useMemo } from 'react'

import { useCurrentProfile } from '@baseapp-frontend/authentication'

import { graphql, useSubscription } from 'react-relay'

const MessageCountUpdateSubscription = graphql`
  subscription useMessageCountUpdateSubscription($profileId: ID!) {
    chatRoomOnMessagesCountUpdate(profileId: $profileId) {
      profile {
        id
        unreadMessagesCount
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

const useMessageCountUpdate = () => {
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

export default useMessageCountUpdate
