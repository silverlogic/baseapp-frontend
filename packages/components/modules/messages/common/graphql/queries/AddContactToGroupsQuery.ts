import { graphql } from 'react-relay'

export const AddContactToGroupsQuery = graphql`
  query AddContactToGroupsQuery($profileId: ID!, $contactProfileId: ID!) {
    profile(id: $profileId) {
      id
      ...AddContactToGroupsListFragment @arguments(contactProfileId: $contactProfileId)
    }
  }
`
