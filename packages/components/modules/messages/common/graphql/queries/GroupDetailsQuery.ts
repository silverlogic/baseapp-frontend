import { graphql } from 'react-relay'

export const GroupDetailsQuery = graphql`
  query GroupDetailsQuery($roomId: ID!, $q: String) {
    chatRoom(id: $roomId) {
      id
      participantsCount
      ...GroupTitleFragment
      ...MembersListFragment @arguments(q: $q)
      ...ProfileSummaryFragment @arguments(q: $q)
    }
  }
`
