import type { NotificationState } from './types'

export const INITIAL_NOTIFICATION_STATE: NotificationState = {
  open: false,
  shouldShowProgress: false,
  message: '',
  type: 'success',
}
