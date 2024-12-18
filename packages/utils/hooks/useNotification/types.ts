export type NotificationState = {
  open: boolean
  message: string
  type: 'success' | 'info' | 'warning' | 'error'
}

type NotificationFunctions = {
  sendToast: (message: string, options?: { type?: NotificationState['type'] }) => void
  sendApiErrorToast: (error: unknown) => void
  sendAllAuthApiErrorToast: (error: unknown) => void
  closeToast: () => void
}

export type UseNotification = NotificationState & NotificationFunctions
