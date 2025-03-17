import { ActivityLogsFragment$data } from '../../../__generated__/ActivityLogsFragment.graphql'

export type ActivityLogs = NonNullable<ActivityLogsFragment$data['activityLogs']>
export type ActivityLogEdges = ActivityLogs['edges']
export type ActivityLogNode = NonNullable<ActivityLogEdges[number]>['node']

export interface LogGroup {
  lastActivityTimestamp: string
  logs: ActivityLogNode[]
}

export interface FetchParameters {
  createdFrom: string | null
  createdTo: string | null
  userName: string
  count: number
  cursor: string | null
}
