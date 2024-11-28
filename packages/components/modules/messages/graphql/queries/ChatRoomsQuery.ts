import { graphql } from 'react-relay'

export const ChatRoomsQuery = graphql`
  query ChatRoomsQuery {
    ...AllProfilesListFragment
    me {
      id
      profile {
        id
        ...RoomsListFragment
      }
    }
  }
`
