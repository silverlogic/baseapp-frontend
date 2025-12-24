import { graphql } from 'react-relay'

export const ProfileSummaryFragment = graphql`
  fragment ProfileSummaryFragment on ChatRoom
  @argumentDefinitions(
    avatarSize: { type: "Int", defaultValue: 100 }
    count: { type: "Int", defaultValue: 5 }
  ) {
    id
    participants(first: $count) {
      edges {
        node {
          profile {
            id
            name
            image(width: $avatarSize, height: $avatarSize) {
              url
            }
            biography
            urlPath {
              path
            }
          }
          role
        }
      }
    }
  }
`
