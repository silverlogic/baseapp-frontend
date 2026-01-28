export interface RemoveAdminPermissionsDialogProps {
  open: boolean
  onClose: () => void
  isMutationInFlight: boolean
  onRemoveConfirmed: () => void
}
