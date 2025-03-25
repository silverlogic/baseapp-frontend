import type { BoxProps } from '@mui/material'

import type {
  ImagePosition,
  PageBannerBlockFields$key,
} from '../../../../__generated__/PageBannerBlockFields.graphql'
import type { PageBodyBlockSharedProps } from '../../StreamField/types'

export type BannerBlockBodyItem = PageBodyBlockSharedProps & PageBannerBlockFields$key

export interface BannerBlockProps extends BannerBlockBodyItem {}

export interface ContainerProps extends BoxProps {
  imagePosition: ImagePosition
}
