import { graphql } from 'react-relay'

// This includes most data (except MembersList) which is found on a chat room.
// It is currently not used in the code.
export const RoomFragment = graphql`
  fragment RoomFragment on ChatRoom {
    id
    isGroup
    participantsCount
    ...LastMessageFragment
    ...MessagesListFragment
    ...TitleFragment
    ...UnreadMessagesCountFragment
  }
`
