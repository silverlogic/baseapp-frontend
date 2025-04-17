import { z } from 'zod'

import { ContentPostCreateForm } from './types'

export const DEFAULT_CONTENT_POST_CREATE_FORM_VALUES = {
  content: '',
  images: [] as File[],
  isReactionsEnabled: true,
}

export const CONTENT_POST_CREATE_FORM_VALIDATION = z.object({
  content: z.string(),
  images: z.array(z.instanceof(File)),
  isReactionsEnabled: z.boolean(),
} satisfies Record<keyof ContentPostCreateForm, unknown>)
