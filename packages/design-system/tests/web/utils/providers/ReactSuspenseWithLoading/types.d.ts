import { ComponentType, PropsWithChildren } from 'react'

export interface ReactSuspenseWithLoadingProps extends PropsWithChildren {
  CustomFallback?: ComponentType
  disabled?: boolean
}
