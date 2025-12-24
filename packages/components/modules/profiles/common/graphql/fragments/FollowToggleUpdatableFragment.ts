import { graphql } from 'react-relay'

export const FollowToggleUpdatableFragment = graphql`
  fragment FollowToggleUpdatableFragment on Profile @updatable {
    isFollowedByMe
    followersCount
  }
`
