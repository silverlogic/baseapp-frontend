import { BoxProps } from '@mui/material'

export interface LogoContainerProps extends BoxProps {
  children: React.ReactNode
  disabledLink?: boolean
}

export type PartialLogoContainerProps = Omit<LogoContainerProps, 'ref' | 'children'>
