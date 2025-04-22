import { ReportTypeListQuery as ReportTypeListQueryType } from '../../../../../__generated__/ReportTypeListQuery.graphql'

export interface ReportButtonWithDialogProps {
  targetId?: string
  handleClose: () => void
}

export type AllReportTypes = NonNullable<ReportTypeListQueryType['response']['allReportTypes']>

export type ReportType = NonNullable<AllReportTypes['edges'][number]>

export type ReportTypeNode = NonNullable<ReportType['node']>

export type ReportTypeSubType = NonNullable<ReportTypeNode['subTypes']['edges'][number]>

export type ReportTypeSubTypeNode = ReportTypeSubType['node']

export interface SelectReportTypeStepProps {
  reportTypes?:
    | ReadonlyArray<ReportTypeNode | null | undefined>
    | ReadonlyArray<ReportTypeSubTypeNode | null | undefined>
  reportType?: ReportTypeNode | ReportTypeSubTypeNode
  subType?: boolean
  setReportType: (reportType: ReportTypeNode) => void
  setCurrentStep: (step: string) => void
  setReportSubType: (reportSubType: ReportTypeSubTypeNode) => void
}

export interface TextStepProps {
  reportText: string
  setReportText: (text: string) => void
  setCurrentStep: (step: string) => void
}

export interface SummaryStepProps {
  reportType?: ReportTypeNode
  reportSubType?: ReportTypeSubTypeNode
  reportText: string
  isMutationInFlight: boolean
  handleReport: () => void
}

export interface ConfirmationStepProps {
  reportType?: ReportTypeNode
  onClose: () => void
}
