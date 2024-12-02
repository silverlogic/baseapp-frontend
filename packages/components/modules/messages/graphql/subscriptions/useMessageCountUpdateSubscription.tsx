import { useMemo } from 'react'

import { graphql, useFragment, useSubscription } from 'react-relay'

import { useCurrentProfile } from '../../../profiles'
import { ProfileItemFragment } from '../../../profiles/graphql/queries/ProfileItem'

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
  const profileData = useFragment(ProfileItemFragment, profile)

  const config = useMemo(
    () => ({
      subscription: MessageCountUpdateSubscription,
      onError: console.error,
      variables: {
        profileId: profileData?.id,
      },
    }),
    [profileData?.id],
  )

  return useSubscription(config)
}

export default useMessageCountUpdate
