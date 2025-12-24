import { graphql } from 'react-relay'

export const FollowToggleMutationQuery = graphql`
  mutation FollowToggleMutation($input: FollowToggleInput!) {
    followToggle(input: $input) {
      follow {
        node {
          target {
            isFollowedByMe
            followersCount
            ...FollowToggleUpdatableFragment
          }
        }
      }
    }
  }
`
