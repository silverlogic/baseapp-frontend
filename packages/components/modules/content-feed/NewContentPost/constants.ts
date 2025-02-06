import { ContentPostCreateForm } from '@baseapp-frontend/components/modules/content-feed/NewContentPost/types'

import { z } from 'zod'

export const DEFAULT_CONTENT_POST_CREATE_FORM_VALUES = {
  content: '',
  images: [],
} satisfies ContentPostCreateForm

export const CONTENT_POST_CREATE_FORM_VALIDATION = z.object({
  content: z.string(),
  images: z.array(z.instanceof(File)),
} satisfies Record<keyof ContentPostCreateForm, unknown>)
