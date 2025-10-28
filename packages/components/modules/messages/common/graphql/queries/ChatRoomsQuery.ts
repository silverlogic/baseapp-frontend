import { graphql } from 'react-relay'

export const ChatRoomsQuery = graphql`
  query ChatRoomsQuery($profileId: ID!) {
    ...AllProfilesListFragment
    profile(id: $profileId) {
      id
      ...RoomsListFragment
    }
  }
`
