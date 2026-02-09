import { BoxProps, TypographyProps } from '@mui/material'

export interface TitleProps {
  title: string
  caption?: string
  ContainerProps?: BoxProps
  TypographyTitleProps?: TypographyProps
  TypographyCaptionProps?: TypographyProps
}
