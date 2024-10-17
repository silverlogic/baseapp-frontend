import { z } from 'zod'

import { SocialUpsertForm } from './types'

export const DEFAULT_FORM_VALUES: SocialUpsertForm = {
  body: '',
}

export const FORM_VALUE: Record<keyof SocialUpsertForm, keyof SocialUpsertForm> = {
  body: 'body',
}

export const VALIDATION_SCHEMA = z.object({
  body: z
    .string()
    .trim()
    .min(1, { message: 'Must have at least one character' })
    .max(1000, { message: 'Must have at most 1000 characters' }),
})

export const NUMBER_OF_COMMENTS_TO_LOAD_NEXT = 5
