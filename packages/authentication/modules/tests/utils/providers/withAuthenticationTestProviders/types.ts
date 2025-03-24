import { PropsWithChildren } from 'react'

import { InitialProfileProviderForTestingProps } from '../InitialProfileProviderForTesting/types'

export interface WithAuthenticationTestProvidersProps extends PropsWithChildren {
  InitialProfileProviderForTestingProps: InitialProfileProviderForTestingProps
}
