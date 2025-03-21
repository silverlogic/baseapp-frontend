export interface ReportButtonWithDialogProps {
  target?: string
  handleClose: () => void
}

export interface ReportType {
  name: string
  label: string
  subTypes: ReportType[]
}
