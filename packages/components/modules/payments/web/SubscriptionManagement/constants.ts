import { MessageDescriptor, defineMessages } from 'react-intl'

export const SUBSCRIPTION_STATUS_MESSAGES: Record<string, MessageDescriptor> = defineMessages({
  Active: {
    id: 'payments.status.active',
    defaultMessage: 'Active',
  },
  Pending: {
    id: 'payments.subscription.status.pending',
    defaultMessage: 'Pending',
  },
  Canceled: {
    id: 'payments.subscription.status.canceled',
    defaultMessage: 'Canceled',
  },
  'Past Due': {
    id: 'payments.subscription.status.pastDue',
    defaultMessage: 'Past Due',
  },
  Unpaid: {
    id: 'payments.subscription.status.unpaid',
    defaultMessage: 'Unpaid',
  },
})

export const FREE_PLAN_FEATURE_MESSAGES = defineMessages({
  coreFeatures: {
    id: 'payments.freePlan.features.coreFeatures',
    defaultMessage: 'Access to core features',
  },
  limitedStorage: {
    id: 'payments.freePlan.features.limitedStorage',
    defaultMessage: 'Limited storage space',
  },
  standardSupport: {
    id: 'payments.freePlan.features.standardSupport',
    defaultMessage: 'Standard support',
  },
  noCommitment: {
    id: 'payments.freePlan.features.noCommitment',
    defaultMessage: 'No commitment required',
  },
})
