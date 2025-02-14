import { graphql, usePaginationFragment } from 'react-relay'

import { AllProfilesListFragment$key } from '../../../../../__generated__/AllProfilesListFragment.graphql'
import { AllProfilesListPaginationQuery } from '../../../../../__generated__/AllProfilesListPaginationQuery.graphql'

export const fragmentQuery = graphql`
  fragment AllProfilesListFragment on Query
  @refetchable(queryName: "AllProfilesListPaginationQuery")
  @argumentDefinitions(
    cursor: { type: "String" }
    count: { type: "Int", defaultValue: 5 }
    orderBy: { type: "String", defaultValue: "name" }
    q: { type: "String", defaultValue: null }
  ) {
    allProfiles(after: $cursor, first: $count, orderBy: $orderBy, q: $q)
      @connection(key: "AllProfilesListFragment_allProfiles") {
      totalCount
      pageInfo {
        hasNextPage
      }
      edges {
        node {
          id
          ...ProfileItemFragment
        }
      }
    }
  }
`
export const useAllProfilesList = (targetRef: AllProfilesListFragment$key) =>
  usePaginationFragment<AllProfilesListPaginationQuery, AllProfilesListFragment$key>(
    fragmentQuery,
    targetRef,
  )
