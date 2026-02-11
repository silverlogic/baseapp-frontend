import { graphql } from 'react-relay'

export const GroupDetailsQuery = graphql`
  query GroupDetailsQuery($roomId: ID!) {
    chatRoom(id: $roomId) {
      id
      participantsCount
      participantIds
      isArchived
      ...RoomTitleFragment
      ...MembersListFragment
    }
  }
`
