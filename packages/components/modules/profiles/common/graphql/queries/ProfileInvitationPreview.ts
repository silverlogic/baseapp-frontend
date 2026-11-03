import { graphql, useLazyLoadQuery } from 'react-relay'

import {
  ProfileInvitationPreviewQuery$data,
  ProfileInvitationPreviewQuery as ProfileInvitationPreviewQueryType,
} from '../../../../../__generated__/ProfileInvitationPreviewQuery.graphql'

export const ProfileInvitationPreviewQuery = graphql`
  query ProfileInvitationPreviewQuery($token: String!, $imageSize: Int = 100) {
    profileInvitationPreview(token: $token) {
      profileName
      profileImage(width: $imageSize, height: $imageSize)
      invitedEmail
      invitedFirstName
      invitedLastName
      inviterName
      message
      role
      status
      expiresAt
      requiresSignIn
    }
  }
`

export type ProfileInvitationPreview = NonNullable<
  ProfileInvitationPreviewQuery$data['profileInvitationPreview']
>

export interface UseProfileInvitationPreviewQueryOptions {
  /** Width and height of `profileImage`, in pixels. Defaults to 100. */
  imageSize?: number
  /** Relay fetch policy. Defaults to `store-and-network`, so a reopened page refreshes the status. */
  fetchPolicy?: 'store-or-network' | 'store-and-network' | 'network-only'
}

/**
 * The public summary of an invitation, for its acceptance page: who invited whom to which
 * profile, its status (an overdue PENDING invitation reads EXPIRED) and whether the invitee
 * signs in (`requiresSignIn`) or signs up to accept. Needs no sign-in: the token is the
 * authorization. Returns `null` for an unknown token. Suspends while loading.
 */
export const useProfileInvitationPreviewQuery = (
  token: string,
  { imageSize, fetchPolicy = 'store-and-network' }: UseProfileInvitationPreviewQueryOptions = {},
): ProfileInvitationPreview | null => {
  const data = useLazyLoadQuery<ProfileInvitationPreviewQueryType>(
    ProfileInvitationPreviewQuery,
    { token, ...(imageSize ? { imageSize } : {}) },
    { fetchPolicy },
  )
  return data.profileInvitationPreview ?? null
}
