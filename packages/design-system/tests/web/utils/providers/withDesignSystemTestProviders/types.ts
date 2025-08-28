import { PropsWithChildren } from 'react'

import { UISettingsProviderProps } from '../../../../../hooks/web'
import { ReactSuspenseWithLoadingProps } from '../ReactSuspenseWithLoading/types'
import { ThemeTestProviderProps } from '../ThemeTestProvider/types'

export interface WithDesignSystemProviderProps extends PropsWithChildren {
  ThemeTestProviderProps: ThemeTestProviderProps
  ReactSuspenseWithLoadingProps: ReactSuspenseWithLoadingProps
  UISettingsProviderProps: UISettingsProviderProps
}
