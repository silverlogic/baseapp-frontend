import { defineMessages } from 'react-intl'
import { graphql } from 'react-relay'

import { ProfileMemberDeactivateMutation } from '../../../../../__generated__/ProfileMemberDeactivateMutation.graphql'
import { useMemberStatusMutation } from './useMemberStatusMutation'

export const ProfileMemberDeactivateMutationQuery = graphql`
  mutation ProfileMemberDeactivateMutation($input: ProfileMemberDeactivateInput!) {
    profileMemberDeactivate(input: $input) {
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
    id: 'profiles.members.deactivate.failed',
    defaultMessage: 'Member could not be deactivated',
  },
  success: { id: 'profiles.members.deactivate.success', defaultMessage: 'Member deactivated' },
})

export const useProfileMemberDeactivateMutation = () =>
  useMemberStatusMutation<ProfileMemberDeactivateMutation>(
    ProfileMemberDeactivateMutationQuery,
    (response) => response?.profileMemberDeactivate?.errors,
    MESSAGES,
  )
