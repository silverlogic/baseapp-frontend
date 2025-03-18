export interface ReportButtonWithDialogProps {
  targetId?: string
  handleClose: () => void
}

export interface ReportType {
  name: string
  label: string
  subTypes: ReportType[]
}
