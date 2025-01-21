import { FC } from 'react'

import { LoadingStateProps } from '@baseapp-frontend/design-system'

import { VirtuosoProps } from 'react-virtuoso'

import { DeviceItemProps } from './DeviceItem/types'

export interface DeviceListProps {
  EmptyState?: FC
  LoadingState?: FC<LoadingStateProps>
  LoadingStateProps?: LoadingStateProps
  DeviceItem?: FC<DeviceItemProps>
  VirtuosoProps?: Partial<VirtuosoProps<any, any>>
}
