import { BoxProps } from '@mui/material/Box'
import { LazyLoadImageProps as ReactLazyLoadImageProps } from 'react-lazy-load-image-component'

export type LazyLoadImageRatio =
  | '4/3'
  | '3/4'
  | '6/4'
  | '4/6'
  | '16/9'
  | '9/16'
  | '21/9'
  | '9/21'
  | '1/1'

export type LazyLoadImageProps = BoxProps &
  ReactLazyLoadImageProps & {
    overlay?: string
    ratio?: LazyLoadImageRatio
    disabledEffect?: boolean
  }
