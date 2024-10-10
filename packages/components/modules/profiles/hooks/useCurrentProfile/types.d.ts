import { ProfileItemFragment$data } from '../../../../__generated__/ProfileItemFragment.graphql'

export type CurrentProfile = {
  profile?: ProfileItemFragment$data
}

export type CurrentProfileKeys = keyof CurrentProfile

export type CurrentProfileState = {
  settings: CurrentProfile
}

type CurrentProfileFunctions = {
  setCurrentProfile: (newCurrentProfiles: Partial<CurrentProfile>) => void
}

export type UseCurrentProfile = CurrentProfileState & CurrentProfileFunctions
