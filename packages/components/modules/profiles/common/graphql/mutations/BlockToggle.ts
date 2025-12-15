import { graphql } from 'react-relay'

export const BlockToggleMutationQuery = graphql`
  mutation BlockToggleMutation($input: BlockToggleInput!) {
    blockToggle(input: $input) {
      block {
        node {
          id
        }
      }
      blockDeletedId @deleteRecord
      target {
        id
        isBlockedByMe
        ...BlockToggleFragment
      }
    }
  }
`
