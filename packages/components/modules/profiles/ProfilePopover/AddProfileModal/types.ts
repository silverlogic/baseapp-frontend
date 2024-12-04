export interface AddProfileModalProps {
  addNewProfileLabel?: string
  termsAndConditionsUrl?: string
  addNewProfileDescription?: string
  onClose?: () => void
  open: boolean
  setOpen: (open: boolean) => void
  submitLabel?: string
}

export interface OrganizationCreateForm {
  name: string
  urlPath: string
}
