import { BannerBlock, RichTextBlock, SectionStreamBlock } from '../../components'
import StandardPage from '../../components/PageTypes/StandardPage'
import type { WagtailPagesContextState } from './types'

export const PROVIDER_INITIAL_STATE: Omit<WagtailPagesContextState, 'currentPage'> = {
  availablePageTypes: {
    // The key must follow the app.model in the BE template, since the package can't define the
    // page types models by itself. The base.StandardPage is the default page type defined in the
    // baseapp-backend-template project.
    'base.StandardPage': StandardPage,
  },
  availableBlocks: {
    section_stream_block: SectionStreamBlock,
    rich_text_block: RichTextBlock,
    banner_block: BannerBlock,
  },
}
