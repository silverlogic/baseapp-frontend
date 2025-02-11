import { graphql } from 'react-relay'

// Ideally this would use a type refinement of the form
// ...on ChatGroup { ...GroupTitleFragment }
// ...on OneOnOneChat { ...RoomTitleFragment }
// but the backend does not provide different ChatRoom types.
// Therefore we fetch both fragments.
export const TitleFragment = graphql`
  fragment TitleFragment on ChatRoom {
    id
    isGroup
    ...RoomTitleFragment
    ...GroupTitleFragment
  }
`
