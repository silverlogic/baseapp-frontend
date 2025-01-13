import { graphql } from 'react-relay'

export const GroupDetailsQuery = graphql`
  query GroupDetailsQuery($roomId: ID!) {
    chatRoom(id: $roomId) {
      id
      image(width: 144, height: 144) {
        url
      }
      title
      ...MembersListFragment
    }
  }
`
