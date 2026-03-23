import { useCurrentProfile } from '@baseapp-frontend/authentication'
import { useNotification } from '@baseapp-frontend/utils'

import { graphql, useMutation } from 'react-relay'
import { PayloadError } from 'relay-runtime'

import {
  FollowToggleMutation,
  FollowToggleMutation$data,
} from '../../../../../__generated__/FollowToggleMutation.graphql'

export const FollowToggleMutationQuery = graphql`
  mutation FollowToggleMutation(
    $input: FollowToggleInput!
    $fetchPerm: Boolean = false
    $perm: String = ""
  ) {
    followToggle(input: $input) {
      target {
        isFollowedByMe
        followersCount
        ... on PermissionsInterface @include(if: $fetchPerm) {
          canMountComponent: hasPerm(perm: $perm)
        }
      }
    }
  }
`

interface UseFollowToggleOptions {
  targetId?: string
  perm?: string
  onCompleted?: (
    response: FollowToggleMutation$data,
    errors: readonly PayloadError[] | null,
  ) => void
}

export const useFollowToggle = ({ targetId, perm, onCompleted }: UseFollowToggleOptions) => {
  const [commitMutation, isMutationInFlight] =
    useMutation<FollowToggleMutation>(FollowToggleMutationQuery)
  const { sendToast } = useNotification()
  const { currentProfile } = useCurrentProfile()

  const toggleFollow = () => {
    if (isMutationInFlight || !currentProfile?.id || !targetId) return

    commitMutation({
      variables: {
        input: {
          targetObjectId: targetId,
          actorObjectId: currentProfile.id,
        },
        ...(perm ? { fetchPerm: true, perm } : {}),
      },
      onCompleted: (_response, errors) => {
        onCompleted?.(_response, errors)
        errors?.forEach((error) => {
          sendToast(error.message, { type: 'error' })
        })
      },
    })
  }

  return { toggleFollow, isMutationInFlight }
}
