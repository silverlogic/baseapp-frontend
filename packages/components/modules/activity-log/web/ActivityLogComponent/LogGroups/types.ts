import { FC } from 'react'

import { LoadMoreFn } from 'react-relay'
import { VirtuosoProps } from 'react-virtuoso'
import { OperationType } from 'relay-runtime'

import { LogGroup } from '../../../common'

export interface LogGroupsProps {
  logGroups: LogGroup[]
  LoadingState?: FC
  LoadingStateProps?: any
  VirtuosoProps?: Partial<VirtuosoProps<any, any>>
  loadNext: LoadMoreFn<OperationType>
  hasNext: boolean
  isLoadingNext: boolean
}
