import { graphql } from 'react-relay'

export const ProfileItemFragment = graphql`
  fragment ProfileItemFragment on Profile
  @argumentDefinitions(avatarSize: { type: "Int", defaultValue: 100 }) {
    id
    name
    image(width: $avatarSize, height: $avatarSize) {
      url
    }
    urlPath {
      path
    }
    user {
      email
    }
  }
`
