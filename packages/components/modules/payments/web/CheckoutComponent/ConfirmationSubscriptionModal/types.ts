export interface ConfirmationSubscriptionModalProps {
  open: boolean
  onClose: () => void
  orderNumber: string | null
  planDetailClickRoute?: string
}
