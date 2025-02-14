import { graphql } from 'relay-runtime'

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
