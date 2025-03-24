import React, { FC } from 'react'

import { LoadingState } from '../../../../../components/web/displays'
import { ReactSuspenseWithLoadingProps } from './types'

const ReactSuspenseWithLoading: FC<ReactSuspenseWithLoadingProps> = ({
  children,
  CustomFallback = LoadingState,
  disabled = false,
}) => {
  if (disabled) {
    return children
  }

  return <React.Suspense fallback={<CustomFallback />}>{children}</React.Suspense>
}

export default ReactSuspenseWithLoading
