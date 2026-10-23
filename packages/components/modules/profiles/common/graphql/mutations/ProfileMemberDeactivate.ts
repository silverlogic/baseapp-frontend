import { useNotification } from '@baseapp-frontend/utils'

import { Disposable, UseMutationConfig, graphql, useMutation } from 'react-relay'

import { ProfileMemberDeactivateMutation } from '../../../../../__generated__/ProfileMemberDeactivateMutation.graphql'

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

export const useProfileMemberDeactivateMutation = (): [
  (config: UseMutationConfig<ProfileMemberDeactivateMutation>) => Disposable,
  boolean,
] => {
  const { sendMutationErrorToast, sendToast } = useNotification()
  const [commitMutation, isMutationInFlight] = useMutation<ProfileMemberDeactivateMutation>(
    ProfileMemberDeactivateMutationQuery,
  )

  const commit = (config: UseMutationConfig<ProfileMemberDeactivateMutation>) =>
    commitMutation({
      ...config,
      onCompleted: (response, errors) => {
        const errorMessage = sendMutationErrorToast(
          response?.profileMemberDeactivate?.errors,
          errors,
          { defaultMessage: 'Member could not be deactivated' },
        )
        if (!errorMessage) {
          sendToast('Member deactivated', { type: 'success' })
        }
        config?.onCompleted?.(response, errors)
      },
      onError: (error) => {
        sendToast(error.message, { type: 'error' })
        config?.onError?.(error)
      },
    })

  return [commit, isMutationInFlight]
}
