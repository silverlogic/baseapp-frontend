import { graphql } from 'react-relay'

export const GroupTitleFragment = graphql`
  fragment GroupTitleFragment on ChatRoom {
    id
    image(width: 144, height: 144)
    title
  }
`
