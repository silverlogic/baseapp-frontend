import type { BoxProps } from '@mui/material'

import type { PageBodyItem } from '../../../services/Wagtail/PagesAPI/types'
import type { ImageRecordItem } from '../../../services/Wagtail/types'

export interface BannerBlockBodyItem extends PageBodyItem {
  value: BannerBlockValue
  type: 'banner_block'
}

export interface BannerBlockProps extends Omit<BannerBlockBodyItem, 'type'> {}

export interface BannerBlockValue {
  featuredImage: ImageRecordItem
  title: string
  description: string
  imagePosition: 'left' | 'right'
}

export interface ContainerProps extends BoxProps {
  imagePosition: 'left' | 'right'
}
