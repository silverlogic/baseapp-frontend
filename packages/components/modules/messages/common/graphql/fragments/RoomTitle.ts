import { graphql } from 'react-relay'

export const RoomTitleFragment = graphql`
  fragment RoomTitleFragment on ChatRoom {
    isSoleAdmin
    id
    image(width: 150, height: 150) {
      url
    }
    title
  }
`
