import { z } from 'zod'

import { ContentPostCreateForm, ContentPostUpdateForm } from './types'

export const DEFAULT_CONTENT_POST_CREATE_FORM_VALUES = {
  content: '',
  images: [],
  isReactionsEnabled: true,
}

export const CONTENT_POST_CREATE_FORM_VALIDATION = z.object({
  content: z.string(),
  images: z.array(z.instanceof(File)),
  isReactionsEnabled: z.boolean(),
} satisfies Record<keyof ContentPostCreateForm, unknown>)

export const CONTENT_POST_UPDATE_FORM_VALIDATION = z.object({
  id: z.string(),
  content: z.string(),
  images: z.array(z.instanceof(File)),
  isReactionsEnabled: z.boolean(),
} satisfies Record<keyof ContentPostUpdateForm, unknown>)
