import { graphql } from 'react-relay'

export const ContentPostImageFragment = graphql`
  fragment ContentPostImageFragment on ContentPostImage
  @argumentDefinitions(
    width: { type: "Int", defaultValue: 600 }
    height: { type: "Int", defaultValue: 0 }
  ) {
    pk
    image(width: $width, height: $height) {
      url
    }
  }
`
