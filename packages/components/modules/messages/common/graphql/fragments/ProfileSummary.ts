import { graphql } from 'react-relay'

export const ProfileSummaryFragment = graphql`
  fragment ProfileSummaryFragment on ChatRoom
  @argumentDefinitions(
    avatarSize: { type: "Int", defaultValue: 100 }
    cursor: { type: "String" }
    count: { type: "Int", defaultValue: 5 }
  ) {
    id
    participants(first: $count, after: $cursor)
      @connection(key: "ProfileSummaryFragment_participants") {
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
