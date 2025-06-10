import type { PropsWithChildren } from 'react'

import { MinimalProfile } from '../../../types/profile'

export interface CurrentProfileProviderProps extends PropsWithChildren {
  initialCurrentProfile?: MinimalProfile | null
}

export interface CurrentProfileState {
  currentProfile: MinimalProfile | null
  setCurrentProfile: (profile: MinimalProfile | null) => void
  updateProfileIfActive: (profile: MinimalProfile) => void
}
