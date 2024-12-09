import { graphql } from 'react-relay'

export const ChatRoomHeaderFragment = graphql`
  fragment ChatRoomHeaderFragment on ChatRoom {
    image(width: 100, height: 100) {
      url
    }
    title
    participants {
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
