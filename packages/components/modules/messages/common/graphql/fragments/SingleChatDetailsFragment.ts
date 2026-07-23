import { graphql } from 'react-relay'

export const SingleChatDetailsFragment = graphql`
  fragment SingleChatDetailsFragment on ChatRoom {
    id
    isSoleAdmin
    isGroup
    title
    image(width: 150, height: 150)
    otherParticipant {
      id
      role
      profile {
        id
        name
        image(width: 150, height: 150)
        biography
        urlPath {
          path
        }
      }
    }
  }
`
