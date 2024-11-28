import { MinimalProfile, ServerSideRenderingOption } from '@baseapp-frontend/utils'

import useCurrentProfile from '../../..'

export const useAndInitializeCurrentProfile = (
  initialProfile: MinimalProfile,
  { noSSR = true }: ServerSideRenderingOption = {},
) => {
  const { currentProfile, setCurrentProfile } = useCurrentProfile({ noSSR })
  setCurrentProfile(initialProfile)
  return { currentProfile, setCurrentProfile }
}
