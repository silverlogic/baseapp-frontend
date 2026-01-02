import { graphql } from 'react-relay'

// non-group chat rooms have the avatar and name of the other participant as title
export const RoomTitleFragment = graphql`
  fragment RoomTitleFragment on ChatRoom
  @argumentDefinitions(cursor: { type: "String" }, count: { type: "Int", defaultValue: 5 }) {
    id
    participants(first: $count, after: $cursor) @connection(key: "RoomTitleFragment_participants") {
      edges {
        node {
          profile {
            id
            name
            image(width: 100, height: 100)
          }
          role
        }
      }
    }
  }
`
