import { graphql } from 'react-relay'

// non-group chat rooms have the avatar and name of the other participant as title
export const RoomTitleFragment = graphql`
  fragment RoomTitleFragment on ChatRoom {
    id
    participants(first: 2) {
      edges {
        node {
          profile {
            id
            name
            image(width: 100, height: 100) {
              url
            }
          }
        }
      }
    }
  }
`
