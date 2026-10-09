export interface ConfirmationSubscriptionModalProps {
  open: boolean
  onClose: () => void
  orderNumber: string | null
  /** Where "View plan details" goes. Known at render, so it links rather than pushes. */
  planDetailsHref: string
}
