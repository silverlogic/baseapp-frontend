import type { BoxProps } from '@mui/material'

import type { IPageBodyItem } from '../../../services/Wagtail/PagesAPI/types'
import type { IImageRecordItem } from '../../../services/Wagtail/types'

export interface IBannerBlock extends IPageBodyItem {
  value: IBannerBlockValue
  type: 'banner_block'
}

export interface IBannerBlockProps extends Omit<IBannerBlock, 'type'> {}

export interface IBannerBlockValue {
  featuredImage: IImageRecordItem
  title: string
  description: string
  imagePosition: 'left' | 'right'
}

export interface ContainerProps extends BoxProps {
  imagePosition: 'left' | 'right'
}
