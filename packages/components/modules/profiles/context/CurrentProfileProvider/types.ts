import { ProfileItemFragment$data } from '../../../../__generated__/ProfileItemFragment.graphql'

export type CurrentProfileState = {
  profile?: ProfileItemFragment$data
  userId?: number
}

type CurrentProfileFunctions = {
  setCurrentProfile: (newCurrentProfiles: Partial<CurrentProfileState>) => void
}

export type UseCurrentProfile = CurrentProfileState & CurrentProfileFunctions
