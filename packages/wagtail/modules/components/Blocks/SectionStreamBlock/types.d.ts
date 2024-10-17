import type { StreamFieldBlocksType } from 'components/StreamField/types'
import type { IPageBodyItem } from 'services/Wagtail/PagesAPI/types'

export interface ISectionStreamBlock extends IPageBodyItem {
  type: 'section_stream_block'
  value: StreamFieldBlocksType[]
}

export interface ISectionStreamBlockProps extends Omit<ISectionStreamBlock, 'type'> {
  id?: string
}
