import { NotificationsListFragment$data } from '../../../__generated__/NotificationsListFragment.graphql'

export type Notifications = NonNullable<NotificationsListFragment$data['notifications']>
export type NotificationsEdges = Notifications['edges']
export type NotificationsNode = NonNullable<NotificationsEdges[number]>['node']
