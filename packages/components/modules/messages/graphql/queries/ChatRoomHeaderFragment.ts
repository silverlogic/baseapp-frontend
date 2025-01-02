import { graphql } from 'react-relay'

export const ChatRoomHeaderFragment = graphql`
  fragment ChatRoomHeaderFragment on ChatRoom {
    id
    image(width: 144, height: 144) {
      url
    }
    title
    isGroup
    participants(first: 5) {
      totalCount
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
