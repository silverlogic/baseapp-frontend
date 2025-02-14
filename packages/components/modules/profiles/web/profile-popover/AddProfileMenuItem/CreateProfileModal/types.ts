export interface CreateProfileModalProps {
  addNewProfileLabel?: string
  termsAndConditionsUrl?: string
  addNewProfileDescription?: string
  onClose?: () => void
  open: boolean
  setOpen: (open: boolean) => void
  submitLabel?: string
  userId: string
}

export interface OrganizationCreateForm {
  name: string
  urlPath: string
}
