import { graphql } from 'react-relay'

export const ContentPostFragmentQuery = graphql`
  fragment ContentPost_post on ContentPost @refetchable(queryName: "ContentPostRefetchQuery") {
    id
    pk
    content
    images {
      edges {
        node {
          id
          ...ContentPostImageFragment
        }
      }
    }
    created
    modified
    profile {
      ...ProfileItemFragment
    }
    isReactionsEnabled
    ...ReactionButton_target
  }
`
