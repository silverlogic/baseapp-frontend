import { defineMessages } from 'react-intl'

/** Where the start and end hooks send the browser by default once the tokens are swapped. */
export const DEFAULT_IMPERSONATION_REDIRECT_PATH = '/'

/** How often the banner's countdown updates, in milliseconds. */
export const IMPERSONATION_COUNTDOWN_INTERVAL_MS = 1000

/** Between the parts of the banner's sentence. */
export const IMPERSONATION_BANNER_SEPARATOR = ' · '

export const IMPERSONATION_BANNER_MESSAGES = defineMessages({
  regionLabel: { id: 'impersonation.banner.regionLabel', defaultMessage: 'Impersonation session' },
  subject: {
    id: 'impersonation.banner.subject',
    defaultMessage:
      '{readOnly, select, true {Viewing as <b>{name}</b> (read only)} other {Acting as <b>{name}</b>}}',
  },
  anotherUser: { id: 'impersonation.banner.anotherUser', defaultMessage: 'another user' },
  signedInAs: { id: 'impersonation.banner.signedInAs', defaultMessage: 'signed in as {name}' },
  endsIn: {
    id: 'impersonation.banner.endsIn',
    defaultMessage: 'ends in {remaining}',
  },
  endSession: { id: 'impersonation.banner.endSession', defaultMessage: 'End session' },
})
