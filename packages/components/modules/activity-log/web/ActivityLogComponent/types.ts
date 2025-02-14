import { FC } from 'react'

import { ActivityLogsPaginationQuery$data } from '../../../../__generated__/ActivityLogsPaginationQuery.graphql'
import { LogGroupsProps } from './LogGroups/types'
import { EVENT_FILTER_OPTIONS } from './constants'

export interface ActivityLogComponentProps {
  queryRef: ActivityLogsPaginationQuery$data
  LogGroups?: FC<LogGroupsProps>
  LogGroupsProps?: Partial<LogGroupsProps>
}

export type EventFilterOption = (typeof EVENT_FILTER_OPTIONS)[number]
