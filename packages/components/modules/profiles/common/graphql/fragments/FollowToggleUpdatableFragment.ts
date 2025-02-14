import { graphql } from 'relay-runtime'

export const FollowToggleUpdatableFragment = graphql`
  fragment FollowToggleUpdatableFragment on Profile @updatable {
    isFollowedByMe
    followersCount
  }
`
