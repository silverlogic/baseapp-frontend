import { graphql } from 'react-relay'

export const GroupDetailsQuery = graphql`
  query GroupDetailsQuery($roomId: ID!) {
    chatRoom(id: $roomId) {
      id
      participantsCount
      ...GroupTitleFragment
      ...MembersListFragment
    }
  }
`
