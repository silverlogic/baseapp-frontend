import type { PageBodyItem } from '../../../services/Wagtail/PagesAPI/types'

export interface SectionStreamBlockBodyItem extends PageBodyItem {
  type: 'section_stream_block'
  value: PageBodyItem[]
}

export interface SectionStreamBlockProps extends Omit<SectionStreamBlockBodyItem, 'type'> {}
