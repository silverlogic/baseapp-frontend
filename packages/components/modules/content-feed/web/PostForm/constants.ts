import { z } from 'zod'

import { ContentPostCreateForm, ContentPostUpdateForm } from './types'

export const DEFAULT_CONTENT_POST_CREATE_FORM_VALUES = {
  content: '',
  images: [] as (File | Blob)[],
  isReactionsEnabled: true,
}

export const CONTENT_POST_CREATE_FORM_VALIDATION = z.object({
  content: z.string(),
  images: z.array(z.union([z.instanceof(File), z.instanceof(Blob)])).optional(),
  isReactionsEnabled: z.boolean(),
} satisfies Record<keyof ContentPostCreateForm, unknown>)

export const CONTENT_POST_UPDATE_FORM_VALIDATION = z.object({
  id: z.string(),
  content: z.string(),
  images: z.array(z.union([z.instanceof(File), z.instanceof(Blob)])),
  isReactionsEnabled: z.boolean(),
} satisfies Record<keyof ContentPostUpdateForm, unknown>)
