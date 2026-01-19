import { graphql } from 'react-relay'

export const SingleChatDetailsFragment = graphql`
  fragment SingleChatDetailsFragment on ChatRoom {
    id
    isSoleAdmin
    isGroup
    title
    image(width: 144, height: 144) {
      url
    }
    otherParticipant {
      id
      role
      profile {
        id
        name
        image(width: 100, height: 100) {
          url
        }
        biography
        urlPath {
          path
        }
      }
    }
  }
`
