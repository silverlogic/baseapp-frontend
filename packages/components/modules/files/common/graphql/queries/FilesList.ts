import { graphql } from 'react-relay'

export const FilesListFragment = graphql`
  fragment FilesList_target on FilesInterface
  @refetchable(queryName: "FilesListRefetchQuery")
  @argumentDefinitions(first: { type: "Int", defaultValue: 20 }, after: { type: "String" }) {
    ... on Node {
      id
    }
    isFilesEnabled
    filesCount
    files(first: $first, after: $after) @connection(key: "FilesList_files") {
      edges {
        node {
          ...FileItem_file
        }
      }
    }
  }
`
