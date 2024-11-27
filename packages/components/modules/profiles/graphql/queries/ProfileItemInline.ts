import { graphql } from 'react-relay'

// TODO: remove this
export const ProfileItemInlineFragment = graphql`
  fragment ProfileItemInlineFragment on Profile
  @inline
  @argumentDefinitions(avatarSize: { type: "Int", defaultValue: 100 }) {
    id
    name
    image(width: $avatarSize, height: $avatarSize) {
      url
    }
    urlPath {
      path
    }
  }
`
