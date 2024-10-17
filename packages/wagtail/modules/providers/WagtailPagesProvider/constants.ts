import type { WagtailPagesContextState } from './types'

export const PROVIDER_INITIAL_STATE: Omit<WagtailPagesContextState, 'currentPage'> = {
  availablePageTypes: {
    'baseapp_wagtail.StandardPage': () =>
      require('../../components/PageTypes/StandardPage').default,
  },
  streamFields: {
    rich_text_block: () => require('../../components/Blocks/RichTextBlock').default,
    section_stream_block: () => require('../../components/Blocks/SectionStreamBlock').default,
  },
}
