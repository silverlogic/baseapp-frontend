import { type PropsWithChildren } from 'react'

import { type MinimalProfile } from '../../../../types/profile'

export interface InitialProfileProviderForTestingProps extends PropsWithChildren {
  initialProfile: MinimalProfile | null
}
