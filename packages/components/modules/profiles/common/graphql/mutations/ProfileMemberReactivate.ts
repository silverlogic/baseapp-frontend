import { defineMessages } from 'react-intl'
import { graphql } from 'react-relay'

import { ProfileMemberReactivateMutation } from '../../../../../__generated__/ProfileMemberReactivateMutation.graphql'
import { useMemberStatusMutation } from './useMemberStatusMutation'

export const ProfileMemberReactivateMutationQuery = graphql`
  mutation ProfileMemberReactivateMutation($input: ProfileMemberReactivateInput!) {
    profileMemberReactivate(input: $input) {
      profileUserRole {
        id
        status
        deactivatedAt
        ...MemberItemFragment
      }
      errors {
        field
        messages
      }
    }
  }
`

const MESSAGES = defineMessages({
  failed: {
    id: 'profiles.members.reactivate.failed',
    defaultMessage: 'Member could not be reactivated',
  },
  success: { id: 'profiles.members.reactivate.success', defaultMessage: 'Member reactivated' },
})

export const useProfileMemberReactivateMutation = () =>
  useMemberStatusMutation<ProfileMemberReactivateMutation>(
    ProfileMemberReactivateMutationQuery,
    (response) => response?.profileMemberReactivate?.errors,
    MESSAGES,
  )
