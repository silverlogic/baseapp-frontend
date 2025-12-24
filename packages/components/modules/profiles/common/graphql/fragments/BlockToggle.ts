import { graphql } from 'react-relay'

export const BlockToggleFragment = graphql`
  fragment BlockToggleFragment on BlocksInterface {
    id
    isBlockedByMe
    ... on Profile {
      id
      name
    }
  }
`
