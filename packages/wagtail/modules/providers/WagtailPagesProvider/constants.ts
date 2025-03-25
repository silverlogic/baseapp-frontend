import { BannerBlock, RichTextBlock, SectionStreamBlock } from '../../components'
import StandardPage from '../../components/PageTypes/StandardPage'
import type { WagtailPagesContextState } from './types'

export const PROVIDER_INITIAL_STATE: Omit<WagtailPagesContextState, 'currentPage'> = {
  availablePageTypes: {
    StandardPage,
  },
  availableBlocks: {
    section_stream_block: SectionStreamBlock,
    rich_text_block: RichTextBlock,
    banner_block: BannerBlock,
  },
}
