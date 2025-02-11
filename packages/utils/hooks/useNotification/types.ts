export type NotificationState = {
  open: boolean
  shouldShowProgress: boolean
  message: string
  type: 'success' | 'info' | 'warning' | 'error'
}

type NotificationFunctions = {
  sendSnack: (message: string, options?: { type?: NotificationState['type'] }) => void
  sendToast: (message: string, options?: { type?: NotificationState['type'] }) => void
  sendApiErrorToast: (error: unknown) => void
  closeToast: () => void
}

export type UseNotification = NotificationState & NotificationFunctions
