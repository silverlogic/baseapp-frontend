import { graphql, usePaginationFragment } from 'react-relay'

import { AddContactToGroupsListFragment$key } from '../../../../../__generated__/AddContactToGroupsListFragment.graphql'
import { addContactToGroupsPaginationQuery } from '../../../../../__generated__/addContactToGroupsPaginationQuery.graphql'

export const AddContactToGroupsListFragment = graphql`
  fragment AddContactToGroupsListFragment on ChatRoomsInterface
  @argumentDefinitions(
    cursor: { type: "String" }
    count: { type: "Int", defaultValue: 20 }
    q: { type: "String", defaultValue: "" }
    contactProfileId: { type: "ID!" }
  )
  @refetchable(queryName: "addContactToGroupsPaginationQuery") {
    chatRooms(first: $count, after: $cursor, q: $q, manageable: true)
      @connection(key: "addContactToGroupsList_chatRooms") {
      edges {
        node {
          id
          ...AddContactToGroupItemFragment @arguments(contactProfileId: $contactProfileId)
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`

export const useAddContactToGroupsList = (targetRef: AddContactToGroupsListFragment$key) =>
  usePaginationFragment<addContactToGroupsPaginationQuery, AddContactToGroupsListFragment$key>(
    AddContactToGroupsListFragment,
    targetRef,
  )
