import { FC } from 'react'

import { LoadMoreFn } from 'react-relay'
import { VirtuosoProps } from 'react-virtuoso'
import { OperationType } from 'relay-runtime'

export interface LogGroupsProps {
  logGroups: LogGroup[]
  LoadingState?: FC
  LoadingStateProps?: any
  VirtuosoProps?: Partial<VirtuosoProps<any, any>>
  loadNext: LoadMoreFn<OperationType>
  hasNext: boolean
  isLoadingNext: boolean
}
export interface LogGroup {
  lastActivityTimestamp: string
  logs: Log[]
}

export interface Log {
  id: string
  createdAt: string
  verb: string
  url: string | null
  user: {
    id: string
    fullName: string | null
    email: string | null
    avatar: {
      url: string
    } | null
  } | null
}
