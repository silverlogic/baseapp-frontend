import { graphql } from 'react-relay'

export const ChatRoomQuery = graphql`
  query ChatRoomQuery($roomId: ID!) {
    chatRoom(id: $roomId) {
      id
      isArchived
      participantsCount
      ...TitleFragment
      ...MessagesListFragment
    }
  }
`
