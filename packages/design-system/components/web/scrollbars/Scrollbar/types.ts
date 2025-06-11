import { SxProps, Theme } from '@mui/material/styles'
// @ts-expect-error - simplebar-react has module resolution issues
import { Props } from 'simplebar-react'

export interface ScrollbarProps extends Props {
  children?: React.ReactNode
  sx?: SxProps<Theme>
}
