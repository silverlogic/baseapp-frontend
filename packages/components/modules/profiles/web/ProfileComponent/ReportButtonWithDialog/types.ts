export interface ReportButtonWithDialogProps {
  currentProfileId?: string
  target?: string
  handleClose: () => void
}

export interface ReportCategory {
  name: string
  title: string
  subCategories: ReportCategory[]
}
