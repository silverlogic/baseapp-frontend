import { useNotification } from '@baseapp-frontend/utils'

import { Disposable, UseMutationConfig, graphql, useMutation } from 'react-relay'

import { ProfileMemberReactivateMutation } from '../../../../../__generated__/ProfileMemberReactivateMutation.graphql'

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

export const useProfileMemberReactivateMutation = (): [
  (config: UseMutationConfig<ProfileMemberReactivateMutation>) => Disposable,
  boolean,
] => {
  const { sendMutationErrorToast, sendToast } = useNotification()
  const [commitMutation, isMutationInFlight] = useMutation<ProfileMemberReactivateMutation>(
    ProfileMemberReactivateMutationQuery,
  )

  const commit = (config: UseMutationConfig<ProfileMemberReactivateMutation>) =>
    commitMutation({
      ...config,
      onCompleted: (response, errors) => {
        const errorMessage = sendMutationErrorToast(
          response?.profileMemberReactivate?.errors,
          errors,
          { defaultMessage: 'Member could not be reactivated' },
        )
        if (!errorMessage) {
          sendToast('Member reactivated', { type: 'success' })
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
