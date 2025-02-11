import { graphql, usePaginationFragment } from 'react-relay'

import { RoomsListFragment$key } from '../../../../../__generated__/RoomsListFragment.graphql'
import { chatRoomsPaginationQuery } from '../../../../../__generated__/chatRoomsPaginationQuery.graphql'

export const RoomsListFragment = graphql`
  fragment RoomsListFragment on ChatRoomsInterface
  @argumentDefinitions(
    cursor: { type: "String" }
    count: { type: "Int", defaultValue: 5 }
    q: { type: "String", defaultValue: "" }
    unreadMessages: { type: "Boolean", defaultValue: false }
    archived: { type: "Boolean", defaultValue: false }
  )
  @refetchable(queryName: "chatRoomsPaginationQuery") {
    chatRooms(
      first: $count
      after: $cursor
      q: $q
      unreadMessages: $unreadMessages
      archived: $archived
    ) @connection(key: "roomsList_chatRooms") {
      edges {
        node {
          id
          ...LastMessageFragment
          ...TitleFragment
          ...UnreadMessagesCountFragment
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`

export const useRoomsList = (targetRef: RoomsListFragment$key) =>
  usePaginationFragment<chatRoomsPaginationQuery, RoomsListFragment$key>(
    RoomsListFragment,
    targetRef,
  )
