export type NotificationState = {
  open: boolean
  shouldShowProgress?: boolean
  message: string
  type: 'success' | 'info' | 'warning' | 'error'
}

type NotificationFunctions = {
  sendToast: (
    message: string,
    options?: { type?: NotificationState['type']; shouldShowProgress?: boolean },
  ) => void
  sendApiErrorToast: (error: unknown, options?: { shouldShowProgress?: boolean }) => void
  closeToast: () => void
}

export type UseNotification = NotificationState & NotificationFunctions
