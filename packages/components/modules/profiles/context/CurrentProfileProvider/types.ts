import { ProfileItemInlineFragment$data } from '../../../../__generated__/ProfileItemInlineFragment.graphql'

export type CurrentProfileState = {
  profile?: ProfileItemInlineFragment$data
  userId?: number
}

type CurrentProfileFunctions = {
  setCurrentProfile: (newCurrentProfile: Partial<CurrentProfileState>) => void
}

export type UseCurrentProfile = CurrentProfileState & CurrentProfileFunctions
