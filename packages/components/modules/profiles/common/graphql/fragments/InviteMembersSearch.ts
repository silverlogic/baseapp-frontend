import { graphql, usePaginationFragment } from 'react-relay'

import { InviteMembersSearchFragment$key } from '../../../../../__generated__/InviteMembersSearchFragment.graphql'
import { InviteMembersSearchPaginationQuery } from '../../../../../__generated__/InviteMembersSearchPaginationQuery.graphql'

export const InviteMembersSearchFragment = graphql`
  fragment InviteMembersSearchFragment on Query
  @refetchable(queryName: "InviteMembersSearchPaginationQuery")
  @argumentDefinitions(
    cursor: { type: "String" }
    count: { type: "Int", defaultValue: 8 }
    q: { type: "String", defaultValue: null }
  ) {
    allProfiles(after: $cursor, first: $count, orderBy: "name", q: $q)
      @connection(key: "InviteMembersSearchFragment_allProfiles") {
      edges {
        node {
          id
          name
          image(width: 100, height: 100)
          urlPath {
            path
          }
          user {
            id
          }
        }
      }
    }
  }
`

export const InviteMembersSearchQuery = graphql`
  query InviteMembersSearchQuery($count: Int, $q: String) {
    ...InviteMembersSearchFragment @arguments(count: $count, q: $q)
  }
`

export const useInviteMembersSearch = (queryRef: InviteMembersSearchFragment$key) =>
  usePaginationFragment<InviteMembersSearchPaginationQuery, InviteMembersSearchFragment$key>(
    InviteMembersSearchFragment,
    queryRef,
  )
