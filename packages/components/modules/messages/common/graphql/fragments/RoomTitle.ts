import { graphql } from 'react-relay'

export const RoomTitleFragment = graphql`
  fragment RoomTitleFragment on ChatRoom {
    image(width: 150, height: 150) {
      url
    }
    title
  }
`
