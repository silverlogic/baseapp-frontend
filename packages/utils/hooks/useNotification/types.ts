import type {
  MutationPayloadErrors,
  MutationTransportErrors,
} from '../../functions/relay/getMutationErrorMessage'

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
  /**
   * Toast the first user-facing error from a mutation's `onCompleted` args (payload errors
   * first, then transport errors). No-op on success. Returns the toasted message, so callers
   * can branch (`if (!sendMutationErrorToast(...)) { ...success path }`).
   */
  sendMutationErrorToast: (
    payloadErrors: MutationPayloadErrors,
    transportErrors: MutationTransportErrors,
    options?: { defaultMessage?: string; shouldShowProgress?: boolean },
  ) => string | undefined
  closeToast: () => void
}

export type UseNotification = NotificationState & NotificationFunctions
