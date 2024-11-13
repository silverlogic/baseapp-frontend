import { graphql, usePaginationFragment } from 'react-relay'

import { RoomsListFragment$key } from '../../../../__generated__/RoomsListFragment.graphql'
import { chatRoomsPaginationQuery } from '../../../../__generated__/chatRoomsPaginationQuery.graphql'

export const RoomsListFragment = graphql`
  fragment RoomsListFragment on Query
  @refetchable(queryName: "chatRoomsPaginationQuery")
  @argumentDefinitions(
    cursor: { type: "String" }
    count: { type: "Int", defaultValue: 5 }
    q: { type: "String", defaultValue: null }
  ) {
    me {
      id
      profile {
        id
        chatRooms(first: $count, after: $cursor, q: $q) @connection(key: "roomsList_chatRooms") {
          edges {
            node {
              id
              unreadMessagesCount
              image(width: 100, height: 100) {
                url
              }
              lastMessageTime
              lastMessage {
                id
                content
              }
              title
              participants {
                totalCount
                edges {
                  node {
                    id
                    profile {
                      id
                      name
                      image(width: 100, height: 100) {
                        url
                      }
                    }
                  }
                }
              }
            }
          }
          pageInfo {
            hasNextPage
            endCursor
          }
        }
        unreadMessagesCount
      }
    }
  }
`

export const useRoomsList = (targetRef: RoomsListFragment$key) =>
  usePaginationFragment<chatRoomsPaginationQuery, RoomsListFragment$key>(
    RoomsListFragment,
    targetRef,
  )
