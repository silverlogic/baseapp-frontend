export interface MarkAllAsReadButtonProps {
  refetch: () => void
  /**
   * Marks only these notifications as read instead of every notification of the user, e.g. the
   * unread notifications of a list filtered by group.
   */
  notificationIds?: ReadonlyArray<string>
}
