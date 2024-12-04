import { MinimalProfile } from '@baseapp-frontend/authentication'

import { ProfileItemFragment$data } from '../../../__generated__/ProfileItemFragment.graphql'

export const getMinimalProfile = function (
  profile: Omit<ProfileItemFragment$data, ' $fragmentType'>,
): MinimalProfile {
  return {
    id: profile.id,
    name: profile.name ?? null,
    image: profile.image?.url ?? null,
    urlPath: profile.urlPath?.path ?? null,
  }
}
