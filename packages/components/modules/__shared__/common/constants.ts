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
