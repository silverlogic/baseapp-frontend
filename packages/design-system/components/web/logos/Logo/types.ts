import { BoxProps } from '@mui/material'

export interface LogoProps extends BoxProps {
  children: React.ReactNode
  disabledLink?: boolean
}

export type PartialLogoProps = Omit<LogoProps, 'ref' | 'children'>
