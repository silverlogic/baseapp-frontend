import { SxProps, Theme } from '@mui/material/styles'
// @ts-ignore TODO: check typing
import { Props } from 'simplebar-react'

export interface ScrollbarProps extends Props {
  children?: React.ReactNode
  sx?: SxProps<Theme>
}
