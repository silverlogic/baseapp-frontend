import { graphql, useMutation } from 'react-relay'

import { ProfileUpdateMutation } from '../../../../../__generated__/ProfileUpdateMutation.graphql'

export const ProfileUpdateMutationQuery = graphql`
  mutation ProfileUpdateMutation($input: ProfileUpdateInput!) {
    profileUpdate(input: $input) {
      profile {
        ...ProfileComponentFragment
      }
      errors {
        field
        messages
      }
    }
  }
`

export const useProfileMutation = () =>
  useMutation<ProfileUpdateMutation>(ProfileUpdateMutationQuery)
