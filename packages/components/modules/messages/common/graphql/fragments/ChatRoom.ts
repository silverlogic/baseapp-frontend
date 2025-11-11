import { graphql } from 'react-relay'

export const ChatRoomFragment = graphql`
  fragment ChatRoomFragment on ChatRoom @refetchable(queryName: "ChatRoomFragmentRefetchQuery") {
    id
    isGroup
    isArchived
    unreadMessages {
      count
      markedUnread
    }
    participantsCount
    ...TitleFragment
    ...MessagesListFragment
  }
`
