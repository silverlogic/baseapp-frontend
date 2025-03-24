import { PropsWithChildren } from 'react'

import { ReactSuspenseWithLoadingProps } from '../ReactSuspenseWithLoading/types'
import { ThemeTestProviderProps } from '../ThemeTestProvider/types'

export interface WithDesignSystemProviderProps extends PropsWithChildren {
  ThemeTestProviderProps: ThemeTestProviderProps
  ReactSuspenseWithLoadingProps: ReactSuspenseWithLoadingProps
}
