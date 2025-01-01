import { FC } from 'react'

import { LoadMoreFn } from 'react-relay'
import { VirtuosoProps } from 'react-virtuoso'
import { OperationType } from 'relay-runtime'

import { ActivityLogsPaginationQuery$data } from '../../../__generated__/ActivityLogsPaginationQuery.graphql'
import { ActivityLogNode } from '../types'
import { EVENT_FILTER_OPTIONS } from './constants'

export interface ActivityLogComponentProps {
  queryRef: ActivityLogsPaginationQuery$data
  LogGroups?: FC<LogGroupsProps>
  LogGroupsProps?: Partial<LogGroupsProps>
}

type EventFilterOption = (typeof EVENT_FILTER_OPTIONS)[number]

export interface EventFilterChipProps {
  options: EventFilterOption[]
  selectedOptions: string[]
  onChange: (selected: string[]) => void
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
export interface LogGroup {
  lastActivityTimestamp: string
  logs: ActivityLogNode[]
}

export interface LogItemProps {
  log: ActivityLogNode
}
