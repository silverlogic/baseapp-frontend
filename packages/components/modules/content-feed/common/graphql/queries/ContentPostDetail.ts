import { graphql } from 'react-relay'

export const ContentPostDetailFragmentQuery = graphql`
  query ContentPostDetailFragmentQuery($id: ID!) {
    contentPost(id: $id) {
      ...ContentPost_post
    }
  }
`
