import type { IPageBodyItem } from '../../../services/Wagtail/PagesAPI/types'

export interface ISectionStreamBlock extends IPageBodyItem {
  type: 'section_stream_block'
  value: IPageBodyItem[]
}

export interface ISectionStreamBlockProps extends Omit<ISectionStreamBlock, 'type'> {}
