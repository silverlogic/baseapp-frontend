import { defineMessages } from 'react-intl'

export const STEPS = {
  report: 'report',
  subTypes: 'subTypes',
  text: 'text',
  summary: 'summary',
  confirmation: 'confirmation',
}

export const REPORT_MESSAGES = defineMessages({
  title: {
    id: 'profiles.report.title',
    defaultMessage: 'Report',
  },
  anonymousNotice: {
    id: 'profiles.report.anonymousNotice',
    defaultMessage:
      "Your report is anonymous. If someone is in immediate danger, call the local emergency services - don't wait.",
  },
  whyReporting: {
    id: 'profiles.report.whyReporting',
    defaultMessage: 'Why are you reporting this?',
  },
})
