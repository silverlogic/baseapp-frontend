import { FC } from 'react'

import { LoadMoreFn } from 'react-relay'
import { VirtuosoProps } from 'react-virtuoso'
import { OperationType } from 'relay-runtime'

import { ActivityLogNode } from '../../types'

export interface LogGroup {
  lastActivityTimestamp: string
  logs: ActivityLogNode[]
}

export interface LogGroupsProps {
  logGroups: LogGroup[]
  LoadingState?: FC
  LoadingStateProps?: any
  VirtuosoProps?: Partial<VirtuosoProps<any, any>>
  loadNext: LoadMoreFn<OperationType>
  hasNext: boolean
  isLoadingNext: boolean
}
