import { graphql } from 'react-relay'

export const ContentPostImageFragment = graphql`
  fragment ContentPostImageFragment on ContentPostImage {
    pk
    image
  }
`
