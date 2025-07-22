import type { BoxProps } from '@mui/material'

import type { ImagePosition } from '../../../../__generated__/PageBannerBlockFields.graphql'
import type { PageBodyBlock } from '../../StreamField/types'

export type BannerBlockBodyItem = PageBodyBlock

export interface BannerBlockProps extends BannerBlockBodyItem {}

export interface ContainerProps extends BoxProps {
  imagePosition: ImagePosition
}
