import { graphql } from 'react-relay'

export const ProfileItemFragment = graphql`
  fragment ProfileItemFragment on Profile @inline {
    id
    name
    image(width: 100, height: 100) {
      url
    }
    urlPath {
      path
    }
  }
`
