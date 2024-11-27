import { useMemo } from 'react'

import { graphql, useSubscription } from 'react-relay'

import { useCurrentProfile } from '../../../profiles'

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
              __typename
              unreadMessagesCount
              ...RoomFragment
            }
          }
        }
      }
    }
  }
`

const useMessageCountUpdate = () => {
  const { profile } = useCurrentProfile()

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