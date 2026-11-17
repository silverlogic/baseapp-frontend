import { defineMessages } from 'react-intl'
import { z } from 'zod'

import { SocialUpsertForm } from './types'
import { hasVisibleContent } from './utils'

export const DEFAULT_SOCIAL_UPSERT_FORM_VALUES: SocialUpsertForm = {
  body: '',
  mentionedProfileIds: [],
  id: '',
}

export const SOCIAL_UPSERT_FORM = {
  body: 'body',
  mentionedProfileIds: 'mentionedProfileIds',
  id: 'id',
} as const satisfies Record<keyof SocialUpsertForm, keyof SocialUpsertForm>

export const SOCIAL_UPSERT_FORM_VALIDATION_SCHEMA = z.object({
  body: z
    .string()
    .trim()
    .min(1, { message: 'Must have at least one character' })
    .max(1000, { message: 'Must have at most 1000 characters' })
    .refine(hasVisibleContent, { message: 'Must have at least one character' }),
  mentionedProfileIds: z.array(z.string()),
  id: z.string().optional(),
})

export const TIMESTAMP_MESSAGES = defineMessages({
  today: { id: 'shared.timestamp.today', defaultMessage: 'Today' },
  yesterday: { id: 'shared.timestamp.yesterday', defaultMessage: 'Yesterday' },
  minutesAgo: {
    id: 'shared.timestamp.minutesAgo',
    defaultMessage: '{count, plural, one {# minute ago} other {# minutes ago}}',
  },
  hoursAgo: {
    id: 'shared.timestamp.hoursAgo',
    defaultMessage: '{count, plural, one {# hour ago} other {# hours ago}}',
  },
  daysAgo: {
    id: 'shared.timestamp.daysAgo',
    defaultMessage: '{count, plural, one {# day ago} other {# days ago}}',
  },
  weeksAgo: {
    id: 'shared.timestamp.weeksAgo',
    defaultMessage: '{count, plural, one {# week ago} other {# weeks ago}}',
  },
  monthsAgo: {
    id: 'shared.timestamp.monthsAgo',
    defaultMessage: '{count, plural, one {# month ago} other {# months ago}}',
  },
})
