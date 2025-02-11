import { graphql } from 'react-relay'

export const AddProfilePopoverUserQuery = graphql`
  query AddProfilePopoverUserQuery {
    me {
      canAdd: hasPerm(perm: "organizations.add_organization")
      id
    }
  }
`
