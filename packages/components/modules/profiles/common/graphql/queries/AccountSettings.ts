import { graphql } from 'react-relay'

export const AccountSettingsQuery = graphql`
  query AccountSettingsQuery($id: ID!) {
    profile(id: $id) {
      id
      ...ProfileComponentFragment
    }
  }
`
