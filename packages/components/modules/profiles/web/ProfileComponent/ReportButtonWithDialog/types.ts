export interface ReportButtonWithDialogProps {
  currentProfileId?: string
  handleClose: () => void
}

export interface ReportType {
  name: string
  label: string
  subTypes: ReportType[]
}
