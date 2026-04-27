import { z } from 'zod'

import { SocialUpsertForm } from './types'

export const DEFAULT_SOCIAL_UPSERT_FORM_VALUES: SocialUpsertForm = {
  body: '',
  mentionedProfileIds: [],
}

export const SOCIAL_UPSERT_FORM: Record<keyof SocialUpsertForm, keyof SocialUpsertForm> = {
  body: 'body',
  mentionedProfileIds: 'mentionedProfileIds',
}

export const SOCIAL_UPSERT_FORM_VALIDATION_SCHEMA = z.object({
  body: z
    .string()
    .trim()
    .min(1, { message: 'Must have at least one character' })
    .max(1000, { message: 'Must have at most 1000 characters' }),
  mentionedProfileIds: z.array(z.string()),
})
