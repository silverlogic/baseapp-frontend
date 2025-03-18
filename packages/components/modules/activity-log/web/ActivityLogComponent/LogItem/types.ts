import { SxProps, Theme } from '@mui/system'

import { ActivityLogsFragment$data } from '../../../../../__generated__/ActivityLogsFragment.graphql'

export type ActivityLogs = NonNullable<ActivityLogsFragment$data['activityLogs']>
export type ActivityLogEdges = ActivityLogs['edges']
export type ActivityLogNode = NonNullable<ActivityLogEdges[number]>['node']
export type LogEvent = NonNullable<ActivityLogNode>['events']

export type LogEventEdges = NonNullable<LogEvent>['edges']
export type LogEventEdgesNode = NonNullable<LogEventEdges[number]>['node']
export type LogDiff = NonNullable<LogEventEdgesNode>['diff']

export interface LogItemProps {
  log: ActivityLogNode
  sx?: SxProps<Theme>
}
