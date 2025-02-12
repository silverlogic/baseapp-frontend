import { graphql } from 'react-relay'

export const DevicesListQuery = graphql`
  query DevicesListQuery($count: Int!, $cursor: String) {
    ...DevicesListFragment @arguments(count: $count, cursor: $cursor)
  }
`

export const DevicesListFragment = graphql`
  fragment DevicesListFragment on Query
  @argumentDefinitions(count: { type: "Int", defaultValue: 10 }, cursor: { type: "String" })
  @refetchable(queryName: "DevicesListPaginationQuery") {
    allUserDevices(first: $count, after: $cursor) @connection(key: "devicesList_allUserDevices") {
      edges {
        node {
          id
          ...DeviceItemFragment
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`
